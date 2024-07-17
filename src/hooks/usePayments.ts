import {usePaymentSheet} from '@stripe/stripe-react-native';
import {useState, useEffect, useCallback} from 'react';
import {stripeClientsAPI} from '../resources/api';
import useUser from '../state/user';

const usePayments = () => {
  const [ready, setReady] = useState<boolean>(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
  const {dispatcher: userDispatcher} = useUser();

  const initializePaymentSheet = async () => {
    try {
      const {customerId, setupIntentSecret} =
        await stripeClientsAPI.paymentSheet();

      const {error} = await initPaymentSheet({
        customerId,
        setupIntentClientSecret: setupIntentSecret,
        merchantDisplayName: 'Terappy MX',
        allowsDelayedPaymentMethods: false,
      });

      if (error) {
        console.error('Error initializing PaymentSheet', error);
      } else {
        setReady(true);
      }
    } catch (error) {
      console.error('Error initializing PaymentSheet', error);
    }
  };

  const saveCard = useCallback(async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      console.error('Error saving card', error);
    }
    userDispatcher.fetchPaymentMethodsStart();
    setReady(false);
  }, [presentPaymentSheet, userDispatcher]);

  useEffect(() => {
    if (ready) {
      saveCard();
    }
  }, [ready, saveCard]);

  return {initializePaymentSheet, loading};
};

export default usePayments;
