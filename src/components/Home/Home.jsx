// REACT
import React from 'react';

// CSS
import './Home.css'; // Importar el archivo CSS

// REDUX
import { useSelector } from 'react-redux';

// MIS COMPONENTES
import BanerSuperior from '../BanerSuperior/BanerSuperior';
import BanerInferior from '../BanerInferior/BanerInferior';
import TablonChats from '../TablonChats/TablonChats';
import TablonPosts from '../TablonPosts/TablonPosts';
import SalaChat from '../SalaChat/SalaChat';

//////////////////
//  FIN IMPORTS //
//////////////////

function Home() {
  const selectedChat = useSelector(state => state.chats.selectedChat);

  // DOM
  return (
    <div className="container">
      <BanerSuperior/>
      <BanerInferior/>
      <TablonChats/>
      {(selectedChat != null) ? <SalaChat /> : <TablonPosts />}
    </div>
  );
}

export default Home;
