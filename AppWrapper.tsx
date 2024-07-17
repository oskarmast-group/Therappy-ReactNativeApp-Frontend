import React from 'react';
import {NativeRouter} from 'react-router-native';
import {Provider} from 'react-redux';
import store from './src/state/store';
import SocketProvider from './src/Socket';
import AlertServiceProvider from './src/alert';
import App from './App';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLIC_KEY} from './src/resources/constants/config';

const HeadlessCheck: React.FC<{isHeadless: boolean}> = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <AppWrapper />;
};

function AppWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={STRIPE_PUBLIC_KEY}
        urlScheme="https:test.terappy.mx">
        <NativeRouter>
          <SocketProvider>
            <AlertServiceProvider>
              <App />
            </AlertServiceProvider>
          </SocketProvider>
        </NativeRouter>
      </StripeProvider>
    </Provider>
  );
}

export default HeadlessCheck;
