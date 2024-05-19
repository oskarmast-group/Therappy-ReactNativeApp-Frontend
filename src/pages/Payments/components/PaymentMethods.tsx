import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { DARKER_TEXT, GREEN } from '../../../resources/constants/colors';
import { useAlert } from '../../../alert';
import useUser from '../../../state/user';
import ALERT_TYPES from '../../../alert/interfaces/AlertTypes';
import { IMAGES_URL } from '../../../resources/constants/urls';
import { BaseText } from '../../../components/Text';
import Button from '../../../components/Button';
import { IPaymentMethod } from '../../../state/user/state';
import DeleteSVG from '../../../resources/img/icons/delete-icon.svg';
import VisaSVG from '../../../resources/img/cards/card-visa.svg';
import AmexSVG from '../../../resources/img/cards/card-amex.svg';
import GenericSVG from '../../../resources/img/cards/card-generic.svg';
import MasterCardSVG from '../../../resources/img/cards/card-mastercard.svg';

const Container = styled.View`
  margin: 0;
  border: 1px solid ${GREEN};
  border-radius: 20px;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  display: flex;
`;
const ImageContainer = styled.View`
  width: 45px;
  overflow: hidden;
  border-radius: 12px;
`;

const ImageCard = styled(View)`
  width: 100%;
  height: 100%;
`;

const Information = styled.View`
  flex: 1;
  min-height: 50px;
  justify-content: center;
  margin-left: 10px;
`;

const CustomText = styled(BaseText)`
  color: ${DARKER_TEXT};
  flex-direction: column;
  display: flex;
`;

const CustomButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 5px;
  width: 35px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CustomImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const renderCardLogo = (brand: string) => {
  switch (brand) {
    case 'visa':
      return <VisaSVG />;
    case 'amex':
      return <AmexSVG />;
    case 'generic':
      return <GenericSVG />;
    case 'mastercard':
      return <MasterCardSVG />;
    default:
      return null; // or render a default logo if brand doesn't match any case
  }
};

const PaymentMethod = ({ method }: { method: IPaymentMethod }) => {
  const alert = useAlert();
  const { data: user, dispatcher: userDispatcher } = useUser();

  const onDelete = () => {
    // console.log('id', method.id);
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: 'Eliminar método de pago',
        body: `¿Estás seguro que quieres eliminar el método con terminación ${method.card.last4}?`,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar',
      },
    })
      .then(() => {
        userDispatcher.deletePaymentMethodStart(method.id);
      })
      .catch(() => {});
  };
  const cardLogo = renderCardLogo(method.card.brand);
  return (
    <Container>
      <ImageContainer>
        <ImageCard>{cardLogo}</ImageCard>
      </ImageContainer>
      <Information>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <BaseText
            style={{ fontSize: 16, color: DARKER_TEXT, fontWeight: 'bold' }}
          >{`**** **** ${method.card.last4}`}</BaseText>
          <BaseText style={{ fontSize: 12, color: DARKER_TEXT, fontWeight: 'bold' }}>
            Expira {`${method.card.exp_month}/${method.card.exp_year}`}
          </BaseText>
        </View>
      </Information>
      <CustomButton>
        <TouchableOpacity
          onPress={onDelete}
          style={{ width: 35, height: 39, padding: 5, display: 'flex', alignItems: 'center' }}
        >
          <DeleteSVG />
        </TouchableOpacity>
      </CustomButton>
    </Container>
  );
};

export default PaymentMethod;
