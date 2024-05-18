import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import User from '../../../interfaces/User';
import { BaseText } from '../../Text';
import Button from '../../Button';

interface CardFormProps {
  user: User | null;
  secret: string;
  onSubmit: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ user, secret, onSubmit }) => {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirmSetupIntent } = useStripe();

  const handleCardDetailsChange = (details: any) => {
    setCardDetails(details);
  };

  const handleSubmit = async () => {
    if (!cardDetails?.complete) {
      setError('Please complete the card details');
      return;
    }
    setLoading(true);
    try {
      const { setupIntent, error } = await confirmSetupIntent(secret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: `${user?.name ?? ''} ${user?.lastName ?? ''}`,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        onSubmit();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button onPress={handleSubmit} disabled={loading}>
        <BaseText style={{ color: '#fff' }}>{loading ? 'Loading...' : 'Confirm'}</BaseText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#d50000',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default CardForm;

export const CardFieldModal: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Modal visible={open} animationType="slide">
      <View>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
    </Modal>
  );
};
