import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native'; // Import CardField and useStripe
import User from '../../../interfaces/User';

const CardForm = ({ user, secret, onSubmit }: { user: User | null; secret: string; onSubmit: () => void }) => {
  const [cardDetails, setCardDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();

  const handleCardDetailsChange = (cardDetails: any) => {
    setCardDetails(cardDetails);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await stripe.confirmSetupIntent(secret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: cardDetails,
        },
      });
      if (result.error) {
        console.log('Stripe Error:', result.error.message);
      } else {
        onSubmit();
      }
    } catch (error: any) {
      console.log('Error:', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: 'Card Number', cvc: 'CVC' }}
        cardStyle={styles.cardField}
        onCardChange={handleCardDetailsChange}
        onFocus={(focusedField) => {
          console.log('focus', focusedField);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{loading ? '...' : 'Confirmar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardField: {},
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardForm;
