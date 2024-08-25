// REACT
import React, { useEffect} from 'react';

// CSS
import './TablonChats.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// MIS COMPONENTES
import Chat from '../Chat/Chat';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, changeChat, cleanChat } from '../../redux/chatsSlice';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';

//////////////////
//  FIN IMPORTS //
//////////////////

function TablonChats() {
    // VARIABLES
    const userId = useSelector(state => state.user.currentUser); 
    const user = useSelector(state => state.user.users[userId]);
    const chats = user.chats;

    const selectedChatId = useSelector(state => state.chats.selectedChat); // CHAT SELECCIONADO
    const selectedGame = useSelector(state => state.games.selectedGame);

    const dispatch = useDispatch();

    // EFECTOS
    useEffect(() => { // DESELECT CHAT AL CLICKCKAR EN JUEGO
        if (selectedGame != null) {
            dispatch(selectChat(null));
        }
    }, [selectedGame]);

    // FUNCIONES
    const handleChatClick = (id) => {
        // 1.- OBTENER MENSAJES
        request(
            "POST",
            "/chat/obtenerMensajesSala",
            {
                chatId: id,
            })
            .then(resp => {
                switch(resp.data.code) {
                    case 0: // ÉXITO
                        dispatch(cleanChat([]))
                        dispatch(selectChat(id)),
                        dispatch(changeChat(resp.data.data.messages))
                        break;

                    default:
                    case 3: // SIN MENSAJES
                        dispatch(cleanChat([]))
                        dispatch(selectChat(id)),
                        toast.warn("Todavía no hay mensajes", {
                            className: "toast-message"
                        });
                        break;
                }
            })
            .catch(error => {
                toast.error("Error al cargar el chat", {
                    className: "toast-message"
                });
            });
    }

    // DOM
    return (
        <div className="div-contenedor-chats">
            {chats.length > 0 ? (
                chats.map(chat => (
                    <Chat 
                        key={chat.id}
                        id={chat.id} 
                        img={chat.img}  
                        name={chat.name}
                        isSelected={selectedChatId === (chat.id)}
                        onClick={() => handleChatClick(chat.id)} 
                    />
                ))
            ) : (
                <p className="texto-no-chats">No tienes ningún chat</p>
            )}
        </div>
    );
}

export default TablonChats;
