// REACT
import React from 'react'
import ReactDOM from 'react-dom/client'

// MIS COMPONENTES
import App from '../components/App/App';

// BIBLIOTECAS EXTERNAS
import { ToastContainer } from 'react-toastify';

// REDUX
import { Provider } from "react-redux";
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// CSS
import '../helpers/styles.scss';
import 'react-toastify/dist/ReactToastify.css';

//////////////////
//  FIN IMPORTS //
//////////////////

// DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer position="top-center" />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
