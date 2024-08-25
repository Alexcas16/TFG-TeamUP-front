// REACT
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// REDUX
import { useDispatch } from 'react-redux';

// AXIOS
import { setupInterceptors } from './axios_interceptor';

//////////////////
//  FIN IMPORTS //
//////////////////

// FUNCIONES
const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setupInterceptors(navigate, dispatch);
    }, [navigate, dispatch]);

    return children;
};

export default AxiosInterceptor;
