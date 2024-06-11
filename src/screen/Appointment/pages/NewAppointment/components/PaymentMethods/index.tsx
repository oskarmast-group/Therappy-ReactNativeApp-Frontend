import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from '../../../../../../context/User';
import { useAlert } from '../../../../../../alert';
import { PRIMARY_GREEN, } from '../../../../../../constant/colors';
import SelectPaymentMethod from '../SelectPaymentMethods';
import AddPaymentMethodDialog from './AddPaymentMethodDialog'; // Adjust this import according to your file structure
import InfoButton from '../../../../../../components/InfoButton';
import { SectionTitle } from '../../../../../../components/Text';

interface PaymentMethodsProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  pricing: {
    total: number;
  };
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, setSelectedMethod, pricing }) => {
  const [user, userDispatcher] = useUser();
  const alert = useAlert();

  useEffect(() => {
    userDispatcher.fetchStart();
    userDispatcher.fetchPaymentMethodsStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedMethod === 'new method') addPaymentMethod();
  }, [selectedMethod]);

  const addPaymentMethod = () => {
    if (!user.current.id) return;

    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: AddPaymentMethodDialog,
        props: {
          userId: user.current.id,
        },
      },
    })
      .then(() => {
        userDispatcher.fetchPaymentMethodsStart();
        // uploadImage(croppedImage);
      })
      .catch(() => {});
  };

  return pricing?.total === 0 ? (
    <InfoButton
      body="¿Sesión gratuita?"
      onClick={() => {
        alert({
          type: ALERT_TYPES.INFO,
          config: {
            title: 'Sesión de cortesía',
            body: (
              <Text>
                La primera sesión con un terapeuta será una entrevista para determinar si es un buen emparejamiento. {'\n'}
                {'\n'}
                Por este motivo no se te cobrarán sesiones hasta que se te asigne oficialmente un terapeuta.
              </Text>
            ),
            buttonText: 'OK',
          },
        })
          .then(() => {})
          .catch(() => {});
      }}
    />
  ) : (
    <>
      <SectionTitle>Método de pago</SectionTitle>
      {user.fetching.paymentMethods.state ? (
        <ActivityIndicator color={PRIMARY_GREEN} size="small" />
      ) : user.paymentMethods.length > 0 ? (
        <SelectPaymentMethod
          paymentMethods={user.paymentMethods}
          selectedMethod={selectedMethod}
          onChangeMethod={(method) => setSelectedMethod(method)}
        />
      ) : (
        <TouchableOpacity style={styles.addMethods} onPress={addPaymentMethod}>
          <Text style={styles.addMethodsText}>Añadir método</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addMethods: {
    backgroundColor: 'transparent',
    margin: 10,
    alignItems: 'center',
  },
  addMethodsText: {
    color: PRIMARY_GREEN,
    fontWeight: '600',
    fontSize: 18,
  },
});

export default PaymentMethods;
