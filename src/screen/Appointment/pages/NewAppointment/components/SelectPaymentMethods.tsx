import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { PRIMARY_GREEN } from '../../../../../constant/colors'; // Adjust this import according to your file structure
import { renderCardLogo } from '../../../../Payments/components/PaymentMethods';
import RNPickerSelect from 'react-native-picker-select';
// import CardSVG 

interface PaymentMethod {
  id: string;
  card: {
    last4: string;
  };
}

interface Method {
  value: string;
  label: string;
}

interface SelectPaymentMethodProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onChangeMethod: (method: string) => void;
}

const transformMethods = (paymentMethods: PaymentMethod[]): Method[] => {
  const methods = paymentMethods.map((pm) => ({
    value: pm.id,
    label: `**** **** ${pm.card.last4}`
  }));
  methods.push({ value: 'new method', label: 'Agregar método de pago' });
  return methods;
};

const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = ({ paymentMethods, selectedMethod, onChangeMethod }) => {
  const [methods, setMethods] = useState<Method[]>(transformMethods(paymentMethods));

  useEffect(() => {
    setMethods(transformMethods(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    if (methods.length === 1) return;
    onChangeMethod(methods[0].value);
  }, [methods]);

  const cardLogo = renderCardLogo(methods?.card?.brand);

  return !!methods && methods.length > 1 && !!selectedMethod ? (
    <View style={styles.container}>
      <Image source={cardLogo} style={styles.image} />
      <RNPickerSelect
        onValueChange={(value) => onChangeMethod(value)}
        items={methods.map(method => ({ label: method.label, value: method.value }))}
        value={selectedMethod}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      />
    </View>
  ) : (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color={PRIMARY_GREEN} size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    borderRadius: 30,
  },
  image: {
    width: 25,
    height: 25,
  },
  picker: {
    flex: 1,
    minWidth: 80,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectPaymentMethod;
