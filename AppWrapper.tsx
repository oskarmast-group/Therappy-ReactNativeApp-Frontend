import React from 'react';
import {NativeRouter} from 'react-router-native';
import {Provider} from 'react-redux';
import store from './src/state/store';
import SocketProvider from './src/Socket';
import AlertServiceProvider from './src/alert';
import App from './App';

function AppWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <NativeRouter>
        <SocketProvider>
          <AlertServiceProvider>
            <App />
          </AlertServiceProvider>
        </SocketProvider>
      </NativeRouter>
    </Provider>
  );
}

export default AppWrapper;
