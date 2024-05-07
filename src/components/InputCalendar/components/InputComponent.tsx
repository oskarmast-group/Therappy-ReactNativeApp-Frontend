import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

const InputComponent: React.ForwardRefRenderFunction<TextInput, TextInputProps> = (props, ref) => {
  return <TextInput style={styles.input} ref={ref} {...props} />;
};

export default React.forwardRef(InputComponent);
