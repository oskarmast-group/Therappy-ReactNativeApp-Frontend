import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomDialogProps} from '../../../../../../../alert/interfaces/CustomDialogProps';
import Base from '../../../../../../../alert/dialog/common/Base';
import Button, {ButtonText} from '../../../../../../../components/Button';
import useUser from '../../../../../../../state/user';
import PaymentMethodCard from '../../../../../../../components/PaymentMethodCard';
import {PRIMARY_GREEN} from '../../../../../../../resources/constants/colors';
import usePayments from '../../../../../../../hooks/usePayments';

interface PaymentMethodsDialogProps {
  selectedMethod: string | null;
}

const PaymentMethodsDialog: React.FC<
  CustomDialogProps<string, PaymentMethodsDialogProps>
> = ({open, onSubmit, onClose, props}) => {
  const {data: user} = useUser();
  const {initializePaymentSheet, loading} = usePayments();

  const onSelectMethod = (methodId: string) => {
    onSubmit(methodId);
  };

  return (
    <Base open={open} onClose={onClose}>
      <View style={styles.container}>
        {user.paymentMethods.map(method => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onPress={() => onSelectMethod(method.id)}
            leading={
              <View style={styles.indicator}>
                <View style={styles.indicatorWhite}>
                  {method.id === props.selectedMethod ? (
                    <View style={styles.indicatorDot} />
                  ) : null}
                </View>
              </View>
            }
          />
        ))}
        <Button disabled={loading} onPress={initializePaymentSheet}>
          <ButtonText width={'100%'}>Agregar Método</ButtonText>
        </Button>
      </View>
    </Base>
  );
};

export default PaymentMethodsDialog;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
    flexShrink: 1,
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_GREEN,
  },
  indicatorWhite: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PRIMARY_GREEN,
  },
});
