// REACT
import React, { useState } from 'react';

// CSS
import './Post.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addChat } from '../../redux/usersSlice';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';

//////////////////
//  FIN IMPORTS //
//////////////////

function Post({postId, imageSrc, usernamePost, text, type }) {
    // VARIABLES
    const userId = useSelector(state => state.user.currentUser);
    const userActual = useSelector(state => state.user.users[userId]);
    const [loading, setLoading] = useState(false);

    const listaPost = useSelector(state => state.posts.posts);

    const dispatch = useDispatch();

    // FUNCIONES
    const joinButton = (type) => {
        setLoading(true);
        let url = (type == 1) ? "/chat/crearChat" : (type == 0 ? "/chat/unirseGrupo" : "");
        
        if (!checkMyPost()) {
            request(
                "POST",
                url,
                {
                  username : userActual.name,
                  postId: postId
                })
                .then(resp => {
                    switch(resp.data.code) {
                        case 0: // ÉXITO
                            dispatch(
                                addChat({
                                    userId: userId,
                                    chat : {
                                        id: resp.data.data.id,
                                        img:resp.data.data.img,
                                        name: resp.data.data.name
                                    }
                                })
                            );
                            toast.success("Te has unido a la sala!", {
                                className: "toast-message"
                            });
                            break;

                        case 2: // GRUPO COMPLETO
                            toast.error((type == 1) ? "El chat ya está completo" : "El grupo ya está completo", {
                                className: "toast-message"
                            });
                            break;

                        default:
                        case 1: // YA PERTENECE AL CHAT
                            toast.warn((type == 1) ? "Ya tienes un chat con el usuario" : "Ya tienes un grupo con el usuario", {
                                className: "toast-message"
                            });
                            break;
                    }
                })
                .catch(error => {
                    toast.error("Error desconocido al unirse a la sala", {
                        className: "toast-message"
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.warn("No puedes unirte con tu propio post", {
                className: "toast-message"
            });
            setLoading(false);
        }
    }

    const checkMyPost = () => {
        const post = listaPost.find(post => post.id === postId);
        return post && post.username === userActual.name;
    }

    const renderButton = () => {
        if (type === 1) {
            return <button className="post-button" onClick={() =>joinButton(type)}>Chat</button>;
        } else if (type === 0) {
            return <button className="post-button" onClick={() => joinButton(type)}>Group</button>;
        }
        return null;
    };

    // DOM
    return (
        <div className="post-container" data-id={postId}>
            {loading && <div className="overlay visible" id="overlay">
                <div className="loader"></div>
            </div>}
            <div className="post-header">
                <img src={imageSrc} className="post-image"/>
                <div className="post-user">{usernamePost}</div>
            </div>
            <div className="post-body">{text}</div>
            <div className="post-footer">
                {renderButton()}
            </div>
           
        </div>
    );
}

export default Post;
