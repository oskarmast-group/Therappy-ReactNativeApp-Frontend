import React from 'react';
import { NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './src/state/store';
import SocketProvider from './src/Socket';
import AlertServiceProvider from './src/alert';
import App from './App';
import RouterProvider from './src/providers/RouterProvider';
import ErrorBoundary from './src/providers/ErrorBoundaryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLIC_KEY } from './src/resources/constants/config';

function AppWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLIC_KEY || ''}>
        <NativeRouter>
          <SocketProvider>
            <RouterProvider>
              <ErrorBoundary>
                <AlertServiceProvider>
                  <App />
                </AlertServiceProvider>
              </ErrorBoundary>
            </RouterProvider>
          </SocketProvider>
        </NativeRouter>
      </StripeProvider>
    </Provider>
  );
}

export default AppWrapper;
