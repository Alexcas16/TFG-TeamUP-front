// REACT
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// MIS COMPONENTES
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';

// AXIOS
import AxiosInterceptor from '../../helpers/axios_helper';

//////////////////
//  FIN IMPORTS //
//////////////////

function App() {

  // DOM
  return (
    <Router>
      <AxiosInterceptor>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login />} /> {/* Ruta por defecto */}
          </Routes>
        </div>
      </AxiosInterceptor>
    </Router>
  )
}

export default App
