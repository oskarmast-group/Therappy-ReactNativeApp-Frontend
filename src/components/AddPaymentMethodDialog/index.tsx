import React, { Children, useEffect } from 'react';
import Base from '../../alert/dialog/components/Base';
import useUser from '../../state/user';
import { StripeProvider } from '@stripe/stripe-react-native';
import CardForm from './CardForm';
import { STRIPE_PUBLIC_KEY } from '../../resources/constants/config';
import Loading from '../../components/Loading';
import { View } from 'react-native';
import { BaseText } from '../Text';

const AddPaymentMethodDialog: React.FC<{ open: boolean; onSubmit: (value?: any) => void; onClose: () => void }> = ({
  open,
  onSubmit,
  onClose,
}) => {
  const { data: user, dispatcher: userDispatcher } = useUser();

  useEffect(() => {
    userDispatcher.setupIntentStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <StripeProvider publishableKey={STRIPE_PUBLIC_KEY as string}>
              <CardForm user={user.current} secret={user.setupIntentToken.secret} onSubmit={onConfirm} />
            </StripeProvider>
          )
        )}
      </View>
    </Base>
  );
};

export default AddPaymentMethodDialog;
