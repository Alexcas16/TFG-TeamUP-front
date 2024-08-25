// REACT
import React, { useEffect} from 'react';

// CSS
import './BanerInferior.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// MIS COMPONENTES
import Game from '../Game/Game';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { changeForum } from '../../redux/postsSlice';
import { selectGame } from '../../redux/gamesSlice';

// BIBLIOTECAS EXTERNAS
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { LuGamepad } from "react-icons/lu";

//////////////////
//  FIN IMPORTS //
//////////////////

function BanerInferior() {
    // VARIABLES
    const dispatch = useDispatch();
    const selectedGameId = useSelector(state => state.games.selectedGame); // JUEGO SELECCIONADO

    const userId = useSelector(state => state.user.currentUser); 
    const user = useSelector(state => state.user.users[userId]);
    const juegos = user.juegos;

    const selectedChat = useSelector(state => state.chats.selectedChat);
    
    // EFECTOS
    useEffect(() => { // SELECCIONA POR DEFECTO JUEGO A LA IZQ
        if (juegos.length > 0) {
            dispatch(selectGame(juegos[0].id));
            handleGameClick(juegos[0].id);
        }
    }, [juegos]);

    // EFECTOS
    useEffect(() => { // DESELECT A JUEGO AL SELECCIONAR CHAT
        if (selectedChat != null) {
            dispatch(selectGame(null));
        }
    }, [selectedChat]);

    // FUNCIONES
    const handleGameClick = (id) => {
        dispatch(selectGame(id));

        request(
            "POST",
            "/post/obtenerPostsForo",
            {
              idJuego: id,
            })
            .then(resp => {
                switch(resp.data.code) {
                    case 0: // ÉXITO
                        dispatch(changeForum(resp.data.data.posts));
                        break;

                    default:
                    case 1: // POST VACIOS
                        if (id != 999) {
                            toast.warn("Todavía no hay posts en este foro", {
                                className: "toast-message"
                            });
                        }
                        dispatch(changeForum(resp.data.data.posts));
                        break;
                }
            })
            .catch(error => {
                toast.error("Error al cargar el foro", {
                    className: "toast-message"
                });
            });
    };

    // DOM
    return ( 
        <div className="baner-inferior">
            <LuGamepad className="icono-banner-inferior" />
            <div className="hbox">
                {juegos.map(juego => (
                    <Game 
                        key={juego.id} 
                        imageUrl={juego.img}
                        isSelected={selectedGameId === juego.id}
                        onClick={() => handleGameClick(juego.id)}
                    />
                ))}
            </div>
            <div className="icono-texto">
                <IoChatboxEllipsesOutline className="icono-banner-Iderecho" />
                <span>Chats</span>
            </div>
        </div>
    );
}

export default BanerInferior;