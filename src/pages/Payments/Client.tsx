import React, {useEffect} from 'react';
import useUser from '../../state/user';
import TopBar from '../../components/TopBar';
import usePayments from '../../hooks/usePayments';
import Scrollable from '../../containers/Scrollable';
import Button, {ButtonText} from '../../components/Button';
import {StyleSheet, View} from 'react-native';
import PaymentMethodCard from '../../components/PaymentMethodCard';
import {BaseText} from '../../components/Text';

const Client: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const {initializePaymentSheet} = usePayments();

  useEffect(() => {
    userDispatcher.fetchPaymentMethodsStart();
  }, [userDispatcher]);

  const addPaymentMethod = () => {
    if (!user.current?.id) {
      return;
    }

    initializePaymentSheet();
  };

  const loadingAccountInfo =
    user.fetching.deletePaymentMethod.isFetching === true ||
    user.fetching.paymentMethods.isFetching === true ||
    user.fetching.fetch.isFetching === true;

  return (
    <>
      <TopBar title={'Pagos'} />
      <Scrollable
        onRefresh={() => {
          userDispatcher.fetchPaymentMethodsStart();
        }}
        refreshing={loadingAccountInfo}>
        <View style={styles.methodsContainer}>
          {user.paymentMethods.length > 0 ? (
            user.paymentMethods.map(method => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                onDelete={
                  loadingAccountInfo
                    ? undefined
                    : () => {
                        userDispatcher.deletePaymentMethodStart({
                          paymentId: method.id,
                        });
                      }
                }
              />
            ))
          ) : (
            <BaseText textAlign={'center'}>
              No tienes métodos de pago registrados aún
            </BaseText>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={addPaymentMethod}
            marginTop={30}
            width={'200px'}
            disabled={loadingAccountInfo}>
            <ButtonText>Agregar Método</ButtonText>
          </Button>
        </View>
      </Scrollable>
    </>
  );
};

export default Client;

const styles = StyleSheet.create({
  methodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 0,
    flexShrink: 1,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexShrink: 1,
    alignSelf: 'center',
  },
});
