import Loading from '../../components/Loading';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import React, { useEffect } from 'react';
import useUser from '../../state/user';
import styled from 'styled-components/native';
import PaymentMethod from './components/PaymentMethods';
import { BaseText, Body } from '../../components/Text';
import AddPaymentMethodDialog from '../../components/AddPaymentMethodDialog';
import Button from '../../components/Button';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import { useAlert } from '../../alert';

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
  const alert = useAlert();

  useEffect(() => {
    userDispatcher.fetchPaymentMethodsStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPaymentMethod = () => {
    if (!user.current?.id) return;
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
        //uploadImage(croppedImage);
      })
      .catch(() => {});
  };

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
                onPress={addPaymentMethod}
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
