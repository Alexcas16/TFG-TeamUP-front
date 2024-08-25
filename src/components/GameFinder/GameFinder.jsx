// REACT
import React, { useState, useEffect } from 'react';

// CSS
import './GameFinder.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// MIS COMPONENTES
import Game from '../Game/Game';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';
import { IoMdCloseCircle } from "react-icons/io";

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addGame } from '../../redux/usersSlice';

//////////////////
//  FIN IMPORTS //
//////////////////

function GameFinder({ onClose }) {
    // ESTADOS
    const [searchTerm, setSearchTerm] = useState(''); // BUSCADOR
    const [listaJuegos, setListaJuegos] = useState([]); // JUEGOS A MOSTRAR (SIN FILTRO)
    const [gamesToAdd, setGamesToAdd] = useState([]); // JUEGOS AÑADIDOS
    const [loading, setLoading] = useState(false);

    // VARIABLES
    const userId = useSelector(state => state.user.currentUser); 
    const userName = useSelector(state => state.user.users[userId].name);
    
    const dispatch = useDispatch();

    const juegosOrdenadosPorNombre = listaJuegos
        .filter(game => game.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));

    // EFECTOS
    useEffect(() => {
        setLoading(true);

        request(
            "POST",
            "/juegos/obtenerJuegosUser",
            {
                username: userName
            }
        ).then(resp => {
            // YA FILTRADOS
            setListaJuegos(resp.data.data.juegos || []);

        }).catch(() => {
            toast.error("Error al obtener juegos", {
                className: "toast-message"
            });
        })
        .finally(() => {
            setLoading(false);
        })

    }, [userName]);
    
    // FUNCIONES
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    const exitGameFinder = () => {
        gamesToAdd.forEach(game => {
            dispatch(addGame({
                userId: game.userId,
                game: game.game
            }));
        });
        onClose();
    };

    const onClickGameToAdd = (selectedGame) => {
        request(
            "POST",
            "/user/addGame",
            {
                user: userName,
                game_id: selectedGame
            }
        ).then(resp => {
            // 1.- ELIMINAR DE LISTA ACTUAL
            setListaJuegos(prevListaJuegos => prevListaJuegos.filter(game => game.id !== selectedGame));
            // 2.- AÑADIR A PENDIENTES
            setGamesToAdd(prevGamesToAdd => [
                ...prevGamesToAdd,
                {
                    userId: userId,
                    game: resp.data.data.juego
                }
            ]);
            toast.success("Juego añadido!", {
                className: "toast-message"
            });

        }).catch(() => {
            toast.error("Error al añadir juego", {
                className: "toast-message"
            });
        });
    };

    // DOM
    return (
        <div className="gameFinder-overlay">
            {loading && <div className="overlay visible" id="overlay">
                <div className="loader"></div>
            </div>}
            <div className="gameFinder-container">
                <IoMdCloseCircle className="close-icon" onClick={exitGameFinder} />
                <div className="gameFinder-header">
                    <input
                        type="text"
                        className="gameFinder-search"
                        placeholder="Buscar juegos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="gameFinder-content">
                    <div className="gameFinder-grid">
                        {juegosOrdenadosPorNombre.map(game => (
                            <Game 
                                key={game.id} 
                                imageUrl={game.img}
                                isSelected={false}
                                onClick={() => onClickGameToAdd(game.id)}
                                altText={game.nombre}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameFinder;
