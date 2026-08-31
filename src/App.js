import React from 'react';
import AuthContext from 'context/AuthContext';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Admin from 'layouts/Admin';
import SignInSide from './views/Login';
import { useState, useEffect, useMemo } from 'react';
import { getTokenApi, setTokenApi, removeTokenApi } from 'API/token';
import { setRangoApi, getRangoApi, removeRangoApi } from 'API/rango';
import {
  setNombreUserApi,
  getNombreUserApi,
  removeNombreUserApi,
} from 'API/nombreUser';
import { setEstadoApi, getEstadoApi, removeEstadoApi } from 'API/estadoUser';
import swal from 'sweetalert';
import { tokenLimite } from 'API/configuraciones';
import jwtDecode from 'jwt-decode';
import DashboardScreen from 'screens/DashboardScreen';
import { getNickApi } from 'API/nick';
import { removeNickApi } from 'API/nick';
import { setNickApi } from 'API/nick';

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [dias, setDias] = useState(0);
  const [sinlicencia, setSinLicencia] = useState(0);
  useEffect(() => {
    (async () => {
      let fecha;

      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        if (day.length == 1) {
          fecha = `${year}-0${month}-0${day}`;
        } else {
          fecha = `${year}-0${month}-${day}`;
        }
      } else {
        if (day.length == 1) {
          fecha = `${year}-${month}-0${day}`;
        } else {
          fecha = `${year}-${month}-${day}`;
        }
      }

      const limite = await tokenLimite(auth);
      console.log('limite', limite);
      if (limite.length == 0) {
        const mostrarAlert = () => {
          swal({
            title: `No tiene licencia`,
            icon: 'error',
            button: 'Aceptar',
          });
        };
        mostrarAlert();
        setSinLicencia(1);
        return null;
      }
      const fechaJWT = jwtDecode(limite[0].Valor);
      const fecha2 = fechaJWT.Date;
      const fechaLimit = new Date(fecha2);
      const fechaActual = new Date(fecha);
      const diferenciaEnMilisegundos =
        fechaLimit.setHours(0, 0, 0, 0) - fechaActual.setHours(0, 0, 0, 0);
      const diferenciaEnDias = Math.floor(
        diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
      );
      setDias(diferenciaEnDias);

      if (diferenciaEnDias < 0) {
        const mostrarAlert = () => {
          swal({
            title: `Licencia Vencida`,
            icon: 'error',
            button: 'Aceptar',
          });
        };
        mostrarAlert();
      } else if (diferenciaEnDias <= 5) {
        const mostrarAlert = () => {
          swal({
            title: `Su licencia vencera en: ${diferenciaEnDias} dias`,
            icon: 'error',
            button: 'Aceptar',
          });
        };
        mostrarAlert();
      }

      if (diferenciaEnDias < 0) {
      } else {
        const token = await getTokenApi();
        const nick = await getNickApi();
        const rango = await getRangoApi();
        const nombre = await getNombreUserApi();
        const estado = await getEstadoApi();
        if (token) {
          setAuth({
            token,
            idUser: jwtDecode(token).id,
            nombre,
            rango,
            estado,
            nick,
          });
        } else {
          setAuth(null);
        }
      }
    })();
  }, []);

  const logout = () => {
    if (auth) {
      removeTokenApi();
      removeRangoApi();
      removeNickApi();
      removeNombreUserApi();
      removeEstadoApi();
      setAuth(null);
    }
  };

  const login = (user) => {
    console.log('Response user: ', user);

    if (
      user.user.response.estado === false ||
      user.user.response.estado === null ||
      user.user.response.estado === 'false'
    ) {
      const mostrarAlert = () => {
        swal({
          title:
            'Usuario desactivado, comuníquese con el administrador de sistemas',
          icon: 'error',
          button: 'Aceptar',
        });
      };
      mostrarAlert();
      return null;
    }

    console.log('Login', user);

    setTokenApi(user.token);
    setRangoApi(user.user.response.rango);
    setEstadoApi(user.user.response.estado);
    setNickApi(user.user.response.Nick);
    setNombreUserApi(
      `${user.user.response.Nombre} ${user.user.response.Apellido}`
    );
    setAuth({
      nick: user.user.response.Nick,
      token: user.token,
      nombre: `${user.user.response.Nombre} ${user.user.response.Apellido}`,
      rango: user.user.response.rango,
      estado: user.user.response.estado,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authData}>
      <BrowserRouter>
        <Routes>
          {sinlicencia == 1 ? (
            <>
              <>
                <Route path="*" element={<SignInSide />} />
              </>
            </>
          ) : (
            <>
              {dias <= 0 ? (
                <>
                  <>
                    <Route path="*" element={<SignInSide />} />
                  </>
                </>
              ) : (
                <>
                  {auth ? (
                    auth.estado === true || auth.estado === 'true' ? (
                      <>
                        <Route path="*" element={<DashboardScreen />} />
                      </>
                    ) : (
                      <>
                        <Route path="*" element={<SignInSide />} />
                      </>
                    )
                  ) : (
                    <>
                      <Route path="*" element={<SignInSide />} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
