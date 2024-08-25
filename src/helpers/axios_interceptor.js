// AXIOS
import axios from 'axios';

// REDUX
import { clearUser } from '../redux/usersSlice';

// VARIABLES
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

// FUNCIONES
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const removeAuthHeader = () => {
    window.localStorage.removeItem("auth_token");
};


export const request = (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null" && getAuthToken() !== "undefined") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};

// INTERCEPTOR
export const setupInterceptors = (navigate, dispatch) => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.data.includes("Token expirado")) { // PARA EXPIRACION DE TOKEN
                console.log('token expirado');
                removeAuthHeader();
                dispatch(clearUser());
                navigate('/Login');
            }
            return Promise.reject(error);
        }
    );
};
