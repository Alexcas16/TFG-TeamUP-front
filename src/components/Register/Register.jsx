// REACT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './Register.css';

// BIBLIOTECAS EXTERNAS
import { toast } from 'react-toastify';

// CSS LOADER
import '../../../public/loadingMask/loadingMask.css';

// AXIOS
import { request, setAuthHeader, removeAuthHeader} from '../../helpers/axios_interceptor';

//////////////////
//  FIN IMPORTS //
//////////////////

function Register() {
  // ESTADOS
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // VARIABLES
  const navigate = useNavigate();

  // FUNCIONES
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const validate = () => {
    let error = '';
    // 1.- VALIDAR NOMBRE
    if (!/^[a-zA-Z0-9]{1,15}$/.test(formData.username)) {
      error = 'El nombre solo puede contener letras y números y tener un máximo de 15 caracteres';
      return error;
    }
    // 2.- VALIDAR PASS
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      error = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un símbolo y un número';
      return error;
    }
    // 3.- VALIDAR EMAIL
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      error = 'El correo no es válido';
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    removeAuthHeader();
    
    let validateError = '';
    validateError = validate();

    if (validateError !== '') {
      toast.error(validateError, {
        className: "toast-message"
      });
      setLoading(false);
      return
    }

    if (formData.password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        className: "toast-message"
      });
      setLoading(false);
      return;
    }

    request(
      "POST",
      "/login/register",
      {
        username: formData.username,
        password: formData.password,
        email: formData.email
      })
      .then(resp => {
        const code = resp.data.code;

        switch(code) {
          case 0: // ÉXITO
            // 1.- GUARDAR TOKEN
            setAuthHeader(resp.data.data.token);

            toast.success("Usuario registrado", {
              className: "toast-message"
            });
            navigate("/Login");
            break;

          case 1: // USERNAME YA ÉXISTE
            toast.error("Username ya registrado", {
              className: "toast-message"
            });
            break;

          case 2: // EMAIL YA EXISTE
            toast.error("Email ya registrado", {
              className: "toast-message"
            });
            break;
          // VALIDAR MAIL?
          case 99: // ERROR NO CONTROLADO
            toast.error("Problemas con el servidor, intentalo más tarde", {
              className: "toast-message"
            });
            break;
        }
      })
      .catch(error => {
        removeAuthHeader();
        console.error('Error:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // DOM
  return (
    <div className="div-contenedor-reg">
      {loading && <div className="overlay visible" id="overlay">
        <div className="loader"></div>
      </div>}
      <h1 className="h1-titulo-reg">Regístrate en Team Up</h1>
      <form className="form-campos-reg" onSubmit={handleSubmit}>
        <div className="div-inputs-reg">
          <label>Email:</label>
          <input className="input-email" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="div-inputs-reg">
          <label>Usuario:</label>
          <input className='input-user' type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="div-inputs-reg">
          <label>Contraseña:</label>
          <input className="input-pass" type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="div-inputs-reg">
          <label>Confirmar Contraseña:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <button className="button-register" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
