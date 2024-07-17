import React, {useEffect, useMemo} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {useAlert} from '../../../../../../alert';
import InfoButton from '../../../../../../components/InfoButton';
import {BaseText, SectionTitle} from '../../../../../../components/Text';
import useUser from '../../../../../../state/user';
import ALERT_TYPES from '../../../../../../alert/interfaces/AlertTypes';
import {PRIMARY_GREEN} from '../../../../../../resources/constants/colors';
import PaymentMethodCard from '../../../../../../components/PaymentMethodCard';
import Loading from '../../../../../../components/Loading';
import PaymentMethodsDialog from './components/PaymentMethodsDialog';
import ChevronRightIcon from '../../../../../../resources/img/icons/ChevronRightIcon';
import usePayments from '../../../../../../hooks/usePayments';

interface PaymentMethodsProps {
  selectedMethod: string | null;
  setSelectedMethod: React.Dispatch<React.SetStateAction<string | null>>;
  pricing: {
    total: number;
  };
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  setSelectedMethod,
  pricing,
}) => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const alert = useAlert();
  const {initializePaymentSheet, loading} = usePayments();

  useEffect(() => {
    userDispatcher.fetchStart();
    userDispatcher.fetchPaymentMethodsStart();
  }, [userDispatcher]);

  const addPaymentMethod = () => {
    initializePaymentSheet();
  };

  const showFreeAppointmentAlert = () => {
    alert({
      type: ALERT_TYPES.INFO,
      config: {
        title: 'Sesión de cortesía',
        body: (
          <>
            <BaseText>
              La primera sesión con un terapeuta será una entrevista para
              determinar si es un buen emparejamiento.
            </BaseText>
            <BaseText>
              Por este motivo no se te cobrarán sesiones hasta que se te asigne
              oficialmente un terapeuta.
            </BaseText>
          </>
        ),
        buttonText: 'OK',
      },
    })
      .then(() => {})
      .catch(() => {});
  };

  const openMethodsDialog = () => {
    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: PaymentMethodsDialog,
        props: {
          selectedMethod,
        },
      },
    })
      .then(method => {
        setSelectedMethod(method);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedMethod) {
      return;
    }
    if (user.paymentMethods.length === 0) {
      return;
    }
    setSelectedMethod(user.paymentMethods[0].id);
  }, [selectedMethod, user.paymentMethods, setSelectedMethod]);

  const method = useMemo(
    () => user.paymentMethods.find(pm => pm.id === selectedMethod),
    [user.paymentMethods, selectedMethod],
  );

  return pricing?.total === 0 ? (
    <InfoButton
      content="¿Sesión gratuita?"
      buttonProps={{
        onPress: showFreeAppointmentAlert,
      }}
    />
  ) : (
    <>
      <SectionTitle>Método de pago</SectionTitle>
      {user.fetching.paymentMethods.isFetching || loading ? (
        <Loading color={PRIMARY_GREEN} size="small" />
      ) : user.paymentMethods.length > 0 && method ? (
        <PaymentMethodCard
          key={method.id}
          method={method}
          onPress={openMethodsDialog}
          trailing={
            <View style={styles.trailingButton}>
              <ChevronRightIcon />
            </View>
          }
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
  trailingButton: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
});

export default PaymentMethods;
