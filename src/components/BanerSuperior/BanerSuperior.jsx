// REACT
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './BanerSuperior.css';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/usersSlice';

// BIBLIOTECAS EXTERNAS
import { IoIosExit } from "react-icons/io";
import { toast } from 'react-toastify';

// MIS RECURSOS
import DefaultprofilePic from '../../../public/images/users/profile_pic_default.png';

//////////////////
//  FIN IMPORTS //
//////////////////

function BanerSuperior() {
  // VARIABLES
  const userId = useSelector(state => state.user.currentUser); 
  const user = useSelector(state => state.user.users[userId]);

  const profilePic = user.img;
  const displayProfilePic = profilePic || DefaultprofilePic;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FUNCIONES
  const handleCloseSession = () => {
    dispatch(clearUser());
    navigate('/Login');

    toast.success("Sesión cerrada", {
      className: "toast-message"
    });
  }

  // DOM
  return (
      <div className="baner-superior">
        <img src= {displayProfilePic} alt="Imagen del banner" className="imagen-banner-superior" />
        <div className="texto-banner">Team UP</div>
        <IoIosExit className="icono-banner-superior" onClick={() => handleCloseSession()}/>
      </div>
  );
}

export default BanerSuperior
