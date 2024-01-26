import React from 'react';
import {NativeRouter, Navigate, Route, Routes} from 'react-router-native';
import Login from './src/pages/Login';
import PrivateRoute from './src/containers/PrivateRoute';
import Home from './src/pages/Home';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './src/state/store';

const AppContainer = styled.SafeAreaView`
  flex: 1;
`;

function App(): JSX.Element {
  return (
    <AppContainer>
      <Provider store={store}>
        <NativeRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={'/home'} />} />
            <Route path="/home/*" element={<PrivateRoute component={Home} />} />
            <Route path="/*" element={<PrivateRoute component={Home} />} />
          </Routes>
        </NativeRouter>
      </Provider>
    </AppContainer>
  );
}

export default App;
