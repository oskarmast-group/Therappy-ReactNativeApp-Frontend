import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import useUser from '../../state/user';
import styled from 'styled-components/native';
import PaymentMethod from './components/PaymentMethods';
import { BaseText, Body } from '../../components/Text';
import AddPaymentMethodDialog from '../../components/AddPaymentMethodDialog'; // Adjusted path
import Button from '../../components/Button';
import { CardField, useConfirmPayment, usePaymentSheet } from '@stripe/stripe-react-native';
import { Alert, View } from 'react-native';
import { API } from '../../resources/constants/urls';
import Authorization from '../../resources/api/auth';
import axios from 'axios';

const MethodsContainer = styled.View`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 10px;
  padding: 0;
  flex: 1;
  min-height: 0;
  margin-bottom: 0;
`;

const ScrollableChild = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
`;

const Clients = () => {
  const { data: user, dispatcher: userDispatcher } = useUser();
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const initialisePaymentSheet = async () => {
    // console.log('initialisePaymentSheet');
    const { setupIntentSecret, ephemeralKey, customerId } = await fetchPaymentSheetParams();
    // console.log(setupIntentSecret);
    const { error } = await initPaymentSheet({
      customerId: customerId,
      customerEphemeralKeySecret: ephemeralKey.secret,
      setupIntentClientSecret: setupIntentSecret,
      merchantDisplayName: 'Example Inc.',
      applePay: {
        merchantCountryCode: 'US',
      },
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
        currencyCode: 'usd',
      },
      allowsDelayedPaymentMethods: true,
      // returnURL: 'stripe-example://stripe-redirect',
    });
    if (error) {
      // console.error('An error occurred while initializing payment sheet:', error.message);
    } else {
      setReady(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const url = `${API}/stripe-clients/payment-sheet`;
      const headers = Authorization();

      const response = await axios.post(url, {}, { headers });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { setupIntentSecret, ephemeralKey, customerId } = response.data;
      // console.log(ephemeralKey.id, 'ephemeralKey');
      return {
        setupIntentSecret,
        ephemeralKey,
        customerId,
      };
    } catch (error) {
      console.error('An error occurred while fetching payment sheet parameters:', error);
      // You can also handle the error here or re-throw it to be handled by the calling code
      throw error;
    }
  };

  async function buy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      // console.error('An error occurred while initializing payment sheet:', error.message);
    } else {
      // Alert.alert('Success', 'The payment method was setup successfully');
      setReady(false);
    }
  }

  return (
    <>
      <TopBar title={'Métodos de pago'} />
      <Scrollable>
        <ScrollableChild>
          {user.fetching.paymentMethods.isFetching === true || user.fetching.fetch.isFetching === true ? (
            <Loading />
          ) : (
            <>
              <MethodsContainer>
                {user.paymentMethods.length > 0 ? (
                  user.paymentMethods.map((method, index) => (
                    <PaymentMethod method={method} key={`payment-method-${index}`} />
                  ))
                ) : (
                  <Body style={{ textAlign: 'center' }}>
                    <BaseText>No tienes métodos de pago registrados aún</BaseText>
                  </Body>
                )}
              </MethodsContainer>
              <Button
                onPress={buy}
                style={{
                  marginTop: 30,
                  maxWidth: 200,
                  alignSelf: 'center',
                }}
              >
                <BaseText style={{ color: '#fff' }}>Agregar Método</BaseText>
              </Button>
            </>
          )}
        </ScrollableChild>
      </Scrollable>
    </>
  );
};

export default Clients;
