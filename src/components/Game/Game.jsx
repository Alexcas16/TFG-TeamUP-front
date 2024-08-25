// REACT
import React from 'react';

// CSS
import './Game.css';

//////////////////
//  FIN IMPORTS //
//////////////////

function Game({ imageUrl, isSelected, onClick, altText }) {
    // DOM
    return (
        <div className={`game-rectangulo ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <img src={imageUrl} alt={altText} />
        </div>
    );
}

export default Game;