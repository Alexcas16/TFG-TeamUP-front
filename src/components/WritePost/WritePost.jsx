// REACT
import React, { useState } from 'react';

// CSS
import './WritePost.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// BIBLIOTECAS EXTERNAS
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/postsSlice';

// AXIOS
import { request } from '../../helpers/axios_interceptor';

//////////////////
//  FIN IMPORTS //
//////////////////

function WritePost({ onClose }) {
    // ESTADOS
    const [message, setMessage] = useState(''); // CUERPO MENSAJE
    const [labelValue, setLabelValue] = useState(0); // PARTICIPANTES
    const [loading, setLoading] = useState(false);

    // VARIABLES
    const userId = useSelector(state => state.user.currentUser);
    const user = useSelector(state => state.user.users[userId]);
    const selectedGame = useSelector(state => state.games.selectedGame);
    const dispatch = useDispatch();

    // FUNCIONES
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        const texto = message;
        const numParticipantes = labelValue;
        
        if (texto.length < 3) {
            toast.warn("El mensaje debe tener al menos 3 caracteres", {
                className: "toast-message"
            });
            return;
        }
        if (texto.length > 2000) {
            toast.warn("El mensaje no puede tener más de 2000 caracteres", {
                className: "toast-message"
            });
            return;
        }
        setLoading(true);

        request(
            "POST",
            "/post/sendPost",
            {
              user: user.name,
              game: selectedGame,
              text: texto,
              numParticipantes: numParticipantes
            })
            .then(resp => {
                dispatch(addPost(
                    {
                        id: resp.data.data.post_id,
                        img: resp.data.data.img,
                        username: user.name,
                        texto: texto,
                        tipo: resp.data.data.type    
                    }
                ));
                toast.success("Post creado correctamente", {
                    className: "toast-message"
                });
            })
            .catch(error => {
                toast.error("Error al crear el Post", {
                    className: "toast-message"
                });

            }).finally(() =>{
                onClose();
                setLoading(false);
            });
    };

    const increaseLabelValue = () => {
        setLabelValue(prevValue => Math.min(prevValue + 1, 7));
    };

    const decreaseLabelValue = () => {
        setLabelValue(prevValue => Math.max(prevValue - 1, 0));
    };

    // DOM
    return (
        <div className="contenedor-ventana-flotante">
            {loading && <div className="overlay visible" id="overlay">
                <div className="loader"></div>
            </div>}
            <div className="ventana-flotante">
                <IoMdCloseCircle className="close-icon" onClick={onClose} />
                <div className="contenido">
                    <textarea
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje aquí..."
                        className="texto"
                        maxLength={2000}
                    ></textarea>
                    <div className="barra-inferior">
                        <div className="left-elements">
                            <FaMinusCircle className="boton-restar" onClick={decreaseLabelValue}/>
                            <label>{labelValue}</label>
                            <FaPlusCircle className="boton-sumar" onClick={increaseLabelValue}/>
                        </div>
                        <button className="send-button" onClick={handleSendMessage}> Enviar </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WritePost;