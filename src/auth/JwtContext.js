import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// components

// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const usuarioPrueba = {
  "usuario": "40208725478",
  "nombre": "Usuario de prueba",
  "apellido": "Costa",
  "roleId": 1,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQwMjA4NzI1NDc4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiam9zZWFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikpvc2UgQW5nZWwgUHJ1ZWJhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6Ikhlcm5hbmRleiBwcnVlYmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbG9jYWxpdHkiOiIxNCIsImV4cCI6MTY5MDc3NDk4NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMTUiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMxNSJ9.6y2qyL0Ss_UIp4AmRlqskHliqho7G2ZZr1nVJ252tH8",
  "comision": 14,
  "cargo": "ESTUDIANTE",
  "user": {
      "usuario": "40208725478",
      "contraseña": "123456789",
      "roleId": "Super User",
      "codigoResetPass": null,
      "email": "prueba@correo.com",
      "regional": 15,
      "nombre": "Usuario de prueba",
      "apellido": "Costa",
      "comision": "GRL",
      "tipo_Mesa": "USUARIO DE PRUEBA",
      "confirmacion_envio": true,
      "imageName": "40208725478.png",
      "imageFile": null,
      "imageSrc": "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
  }
}

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async (usuario) => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get('/api/USUARIOS/cuenta');

        const user  = usuarioPrueba;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (id, contraseña) => {
    try{
      // const response = await axios.get(`/api/USUARIOS/${id}/${contraseña}`);

      const { accessToken, user } = usuarioPrueba;
      
      setSession(accessToken);

      localStorage.removeItem('error');

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    }catch(e) {
      if(e.status === 404){
        localStorage.setItem('error', e.status)
      }else
      {
        localStorage.setItem('error', e.status)
      }
    }
    
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
