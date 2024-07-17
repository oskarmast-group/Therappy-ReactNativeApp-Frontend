import React, {PropsWithChildren} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {BaseText} from '../Text';
import PaymentMethod from '../../interfaces/User/Payments';
import CARD_BRAND from '../../resources/constants/cardBrands';
import CardAmexIcon from '../../resources/img/icons/cards/CardAmexIcon';
import CardGenericIcon from '../../resources/img/icons/cards/CardGenericIcon';
import DeleteIcon from '../../resources/img/icons/DeleteIcon';
import CardVisaIcon from '../../resources/img/icons/cards/CardVisaIcon';
import CardMastercardIcon from '../../resources/img/icons/cards/CardMastercardIcon';

const Container: React.FC<PropsWithChildren<{onPress?: () => void}>> = ({
  onPress,
  children,
}) => {
  return onPress ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>{children}</View>
  );
};

const getSrc = (brand: CARD_BRAND): React.JSX.Element => {
  switch (brand) {
    case CARD_BRAND.AMEX:
      return <CardAmexIcon />;
    case CARD_BRAND.MASTERCARD:
      return <CardMastercardIcon />;
    case CARD_BRAND.VISA:
      return <CardVisaIcon />;
    default:
      return <CardGenericIcon />;
  }
};

const PaymentMethodCard: React.FC<{
  method: PaymentMethod;
  onPress?: () => void;
  onDelete?: () => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}> = ({method, onPress, onDelete, leading, trailing}) => {
  return (
    <Container onPress={onPress}>
      {leading}
      <View style={styles.imageContainer}>{getSrc(method.card.brand)}</View>
      <View style={styles.informationContainer}>
        <BaseText
          fontSize={16}
          weight={700}>{`**** **** ${method.card.last4}`}</BaseText>
        <BaseText fontSize={12}>
          Expira {`${method.card.exp_month}/${method.card.exp_year}`}
        </BaseText>
      </View>
      {onDelete && (
        <TouchableOpacity style={styles.trailingButton} onPress={onDelete}>
          <DeleteIcon />
        </TouchableOpacity>
      )}
      {trailing}
    </Container>
  );
};

export default PaymentMethodCard;
