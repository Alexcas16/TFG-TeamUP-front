// REACT
import React, { useState } from 'react';

// CSS
import './TablonPosts.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// MIS COMPONENTES
import Post from '../Post/Post';
import WritePost from '../WritePost/WritePost';
import GameFinder from '../GameFinder/GameFinder';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { removeGame } from '../../redux/usersSlice';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';
import { IoMdCreate } from "react-icons/io";

// MIS RECURSOS
import DefaultprofilePic from '../../../public/images/users/profile_pic_default.png';

//////////////////
//  FIN IMPORTS //
//////////////////

function TablonPosts() {
    // ESTADOS
    const [isWritePostVisible, setWritePostVisible] = useState(false); // VENTNA PARA ESCRIBIR POST
    const [isGameFinderVisible, setGameFinderVisible] = useState(false); // VENTNA GAMEFINDER
    const [loading, setLoading] = useState(false);

    // VARIABLES
    const userId = useSelector(state => state.user.currentUser);
    const user = useSelector(state => state.user.users[userId]);
    const userName = user.name;
    
    const posts = useSelector(state => state.posts.posts || []);
    const selectedGame = useSelector(state => state.games.selectedGame);
    const showCreateIcon = selectedGame != 999;
    const dispatch = useDispatch();

    // FUNCIONES
    const handleCreatePost = () => {
        setWritePostVisible(true);
    };

    const renderMessage = () => {
        if (posts.length === 0 && selectedGame !== 999) { // NO HAY POSTS
            return <div className="texto-especial">Todavía no hay posts en este foro</div>;
        }
        if (selectedGame === 999) { // CASO LUPA
            return <div className="texto-especial">
                    Busca juegos <a href='#' onClick={handleLinkClick}>aquí</a> y añádelos a tu lista
                    {isGameFinderVisible && <GameFinder onClose={() => setGameFinderVisible(false)}/>}
                </div>
        }
        return null;
    };

    const handleRemoveGame = () => {
       setLoading(true);

       request(
        "POST",
        "/juegos/eliminarJuego",
        {
          idJuego: selectedGame,
          username: userName,
        })
        .then(resp => {
            if (resp.data.code == 0) { // ÉXITO
                dispatch(removeGame({
                    userId: userId,
                    gameId: selectedGame
                }));
                toast.success("Juego eliminado", {
                    className: "toast-message"
                });
            }
        })
        .catch(error => {
            toast.error("Error al eliminar juego", {
                className: "toast-message"
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleLinkClick = (event) => {
        event.preventDefault();
        setGameFinderVisible(true);
    };

    // DOM
    return (
        <div className="div-contenedor-posts">
            {loading && <div className="overlay visible" id="overlay">
                <div className="loader"></div>
            </div>}
            {selectedGame && selectedGame !== 999 && (
                <button className="remove-button" onClick={handleRemoveGame}>
                    Eliminar juego
                </button>
            )}
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post
                        key={post.id}
                        postId={post.id}
                        imageSrc={post.img || DefaultprofilePic}
                        usernamePost={post.username}
                        text={post.texto}
                        type={post.tipo}
                    />
                ))
            ) : (
                renderMessage()
            )}
            {showCreateIcon && <IoMdCreate className="floating-icon" onClick={handleCreatePost} />}
            {isWritePostVisible && <WritePost onClose={() => setWritePostVisible(false)} />}
        </div>
    );
}

export default TablonPosts;
