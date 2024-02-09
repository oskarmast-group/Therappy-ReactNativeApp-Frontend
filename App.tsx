import React from 'react';
import {NativeRouter, Navigate, Route, Routes} from 'react-router-native';
import Login from './src/pages/Login';
import PrivateRoute from './src/containers/PrivateRoute';
import Home from './src/pages/Home';
import {Provider} from 'react-redux';
import store from './src/state/store';
import SocketProvider from './src/Socket';
import AlertServiceProvider from './src/alert';
import Logout from './src/pages/Logout';
import Therapist from './src/pages/Therapist';
import Profile from './src/pages/Profile';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NativeRouter>
        <SocketProvider>
          <AlertServiceProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Navigate to={'/home'} />} />
              <Route
                path="/home/*"
                element={<PrivateRoute component={Home} />}
              />
              <Route
                path="/terapeutas/*"
                element={<PrivateRoute component={Therapist} />}
              />
              <Route
                path="/perfil/*"
                element={<PrivateRoute component={Profile} />}
              />
            </Routes>
          </AlertServiceProvider>
        </SocketProvider>
      </NativeRouter>
    </Provider>
  );
}

export default App;
