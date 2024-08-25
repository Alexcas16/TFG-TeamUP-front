import React, { useState, useEffect } from 'react';

// CSS
import './SalaChat.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// MIS COMPONENTES
import ChatMessage from '../ChatMessage/ChatMessage';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, changeChat } from '../../redux/chatsSlice';
import { changeForum } from '../../redux/postsSlice';
import { removeChat } from '../../redux/usersSlice';
import { selectGame } from '../../redux/gamesSlice';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

// LIBRERIAS EXTERNAS
import { IoIosSend } from "react-icons/io";
import { toast } from 'react-toastify';

//////////////////
//  FIN IMPORTS //
//////////////////

function SalaChat() {
    // ESTADOS
    const [isFocused, setIsFocused] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // VARIABLES
    const messages = useSelector(state => state.chats.chatMessages) || [];
    const selectedChat = useSelector(state => state.chats.selectedChat);

    const userId = useSelector(state => state.user.currentUser);
    const user = useSelector(state => state.user.users[userId]);

    const dispatch = useDispatch();

    // EFECTOS
    useEffect(() => {
      if (selectedChat) {
        refrescarMensajes();
      }
      const intervalId = setInterval(refrescarMensajes, 15000);
      return () => clearInterval(intervalId);
    }, [selectedChat]);

    // FUNCIONES
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (!validarMensaje(newMessage)) {
        return;
      }
      setLoading(true);
      
      request(
        "POST",
        "/chat/enviarMensaje",
        {
          chatId: selectedChat,
          userId: userId,
          msg: newMessage
        }
      ).then(resp => {
        if (resp.data.code === 0) { // ÉXITO
          dispatch(addMessage(resp.data.data.message));
          setNewMessage('');
        }
      }).catch(() => {
        toast.error("Error al enviar el mensaje", {
          className: "toast-message"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    };

    const refrescarMensajes = () => {
      if (!selectedChat) return;

      request(
        "POST",
        "/chat/obtenerMensajesSala",
        {
          chatId: selectedChat,
        }
      ).then(resp => {
        if (resp.data.code === 0) { // ÉXITO
          dispatch(changeChat(resp.data.data.messages));
        }
      }).catch(() => {
        console.error("Error al refrescar mensajes");
      })
    }

    const validarMensaje = (msg) => {
      // Validar si el mensaje está vacío
      if (msg.trim() === '') {
        toast.error("El mensaje no puede estar vacío", {
          className: "toast-message"
        });
        return false;
      }

      // Validar si el mensaje contiene '*'
      if (msg.includes('*')) {
        toast.error("El mensaje no puede contener el carácter '*'", {
          className: "toast-message"
        });
        return false;
      }

      return true;
    }

    const handleCheckMembers = () => {
      request(
        "POST",
        "/chat/mostrarParticipantes",
        {
          chatId: selectedChat,
        }
      ).then(resp => {
        switch(resp.data.code) {
          case 0:

            const participantes = resp.data.data.usuarios;
            const participantesList = participantes.map(part => `<div>${part}</div>`).join('');
            const mensaje = `Lista de participantes:<br>${participantesList}`;
            
            toast.success(<div dangerouslySetInnerHTML={{ __html: mensaje }} />, {
              className: "toast-message",
            });
            break;

          case 3:
            toast.warn("No hay participantes", {
              className: "toast-message"
            });
            break;

          case 99:
            toast.error("Error al comprobar participantes, chat no encontrado", {
                      className: "toast-message"
            });
            break;
        }

      }).catch(() => {
        toast.error("Error al comprobar participantes", {
          className: "toast-message"
        });
      })
    }

    const handleExitChat = (e) => {
      request(
        "POST",
        "/chat/salirChat",
        {
          chatId: selectedChat,
          userName: user.name
        }
      ).then(resp => {
        if (resp.data.code == 0) {
          // 1.- ELIMINAR CHAT
          dispatch(removeChat(
            {
              userId: userId,
              chatId: selectedChat
            }
          ));

          // 2.- CAMBIAR SELECCION
          dispatch(selectGame(999));
          dispatch(changeForum({}));
          
          toast.success("Sala eliminada", {
            className: "toast-message"
          });
        }
      }).catch(() => {
        toast.error("Error al salir del chat mensajes", {
          className: "toast-message"
        });
      })
    }

    // DOM
    return (
      <div className="salaChat-container">
        {loading && <div className="overlay visible" id="overlay">
          <div className="loader"></div>
        </div>}
        <button className="remove-chat-button" onClick={handleExitChat}>
            Salir del chat
        </button>
        <button className="members-button" onClick={handleCheckMembers}>
            Participantes
        </button>
        <div className="messages-container">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              username={msg.username}
              id={msg.id}
              time={msg.time}
              img={msg.img}
              text={msg.text}
            />
          ))}
        </div>
        <form className={`input-container ${isFocused ? 'focused' : ''}`} onSubmit={handleSendMessage}>
          <textarea
            value={newMessage}
            placeholder="Escribe un mensaje..."
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="1"
          />
          <button
            type="submit"
            className="send-button"
            onMouseDown={(e) => e.preventDefault()}
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    );
}

export default SalaChat;
