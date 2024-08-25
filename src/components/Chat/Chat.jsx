// REACT
import React from 'react';

// CSS
import './Chat.css';

//////////////////
//  FIN IMPORTS //
//////////////////

function Chat({id, img, name, isSelected, onClick}) {
    // DOM
    return (
        <div className={`contenedor-chat ${isSelected ? 'selected' : ''}`} data-id={id} onClick={onClick}>
            <img src={img} className="chat-imagen"/>
            <div className="chat-text">{name}</div>
        </div>
    );
}

export default Chat;
