import React, { useEffect } from 'react';
import Base from '../../alert/dialog/components/Base';
import useUser from '../../state/user';
import { StripeProvider } from '@stripe/stripe-react-native';
import CardForm from './CardForm';
import { STRIPE_PUBLIC_KEY } from '../../resources/constants/config';
import Loading from '../../components/Loading';
import { View } from 'react-native';
import { BaseText } from '../Text';
import { initStripe } from '@stripe/stripe-react-native';

const AddPaymentMethodDialog: React.FC<{ open: boolean; onSubmit: (value?: any) => void; onClose: () => void }> = ({
  open,
  onSubmit,
  onClose,
}) => {
  const { data: user, dispatcher: userDispatcher } = useUser();

  useEffect(() => {
    const setupStripe = async () => {
      try {
        await initStripe({
          publishableKey: STRIPE_PUBLIC_KEY || '',
        });
        userDispatcher.setupIntentStart();
      } catch (error) {
        console.error('Error initializing Stripe', error); // Improved error handling
      }
    };
    setupStripe();
  }, [userDispatcher]);

  const onConfirm = () => {
    onSubmit();
  };

  return (
    <Base open={open} onClose={onClose} showCloseButton={true}>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        {user.fetching.setup.state ? (
          <Loading />
        ) : (
          user.setupIntentToken && (
            <CardForm user={user.current} secret={user.setupIntentToken.secret} onSubmit={onConfirm} />
          )
        )}
      </View>
    </Base>
  );
};

export default AddPaymentMethodDialog;
