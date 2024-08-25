// REACT
import React from 'react';

// REDUX
import { useSelector } from 'react-redux';

// CSS
import './ChatMessage.css';

function ChatMessage({ username, id, time, img, text }) {
  // VARIABLES
  const userId = useSelector(state => state.user.currentUser); 
  const userName = useSelector(state => state.user.users[userId].name);
  
  const isCurrentUser = username === userName;

  const messageType = text.startsWith('**') && text.includes('unió')
    ? 'welcome'
    : text.startsWith('**') && text.includes('abandonó')
    ? 'bye'
    : 'normal'
  const containerClassName = `chatMessage-container ${isCurrentUser ? 'currentUser' : ''} ${messageType}`;

  // FUNCIONES
  const parseTime = (time) => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
  }

  // DOM
  return (
    <div
      className={containerClassName}
      key={id}
    >
      {messageType === 'welcome' ? (
        <div className="welcome-message">
          <p>{text}</p>
        </div>
      ) : messageType === 'bye' ? (
        <div className="bye-message">
          <p>{text}</p>
        </div>
      ) : (
        <>
          <div className="chatMessage-header">
            <img src={img} alt={`${username}'s avatar`} className="chatMessage-avatar" />
            <div className="chatMessage-info">
              <span className="chatMessage-username">{username}</span>
              <span className="chatMessage-timestamp">{parseTime(time)}</span>
            </div>
          </div>
          <div className="chatMessage-body">
            <p>{text}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessage;
