// REACT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './Login.css';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';

// REDUX
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/usersSlice';

// AXIOS
import { request, setAuthHeader, removeAuthHeader } from '../../helpers/axios_interceptor';

//////////////////
//  FIN IMPORTS //
//////////////////

function Login() {
  // ESTADOS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  // VARIABLES
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FUNCIONES
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    removeAuthHeader();
    
    request(
      "POST",
      "/login/tryLogin",
      {
        username: username,
        password: password
      })
      .then(resp => {
        let code = resp.data.code;

        switch(code)  {

          case 0: // ÉXITO
            // 1.- GUARDAR TOKEN
            setAuthHeader(resp.data.data.token);

            // 2.- ACTUALIZAR REDUX
            const user = {
              id: resp.data.data.userId,
              name: resp.data.data.userName,
              img: resp.data.data.img,
              juegos: resp.data.data.juegos,
              chats: resp.data.data.chats
            };
            
            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user)); // PARA RECARGAS
            navigate("/Home");
            break;

          case 3: // USER NO EXISTE
            toast.error("Usuario no existe", {
              className: "toast-message"
            });
            break;

          case 4: // PASS INCORRECTA
            toast.error("Contraseña incorrecta", {
              className: "toast-message"
            });
            break;

          case 99: // ERROR NO CONTROLADO
            toast.error("Contraseña incorrecta", {
              className: "toast-message"
            });
            break;
        }
      })
      .catch(error => {
        removeAuthHeader();
        console.error('Error:', error.message);
        // TODO - Limpiar campos ??
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // DOM
  return (
    <div className="div-contenedor">
      {loading && <div className="overlay visible" id="overlay">
        <div className="loader"></div>
      </div>}
      <h1 className="h1-titulo">Team Up</h1>
      <form className="form-campos" onSubmit={handleSubmit}>
        <div className="div-inputs">
          <label>Usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} className="div-input-usuario"/>
        </div>
        <div className='div-inputs'>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button className="button-login" type="submit" disabled={loading}>Login</button>
        <label className="register-label">
          Si no estás registrado, registraté <a href="/register" onClick={handleRegisterClick}>aquí</a>.
        </label>
      </form>
    </div>
  );
}

export default Login;
