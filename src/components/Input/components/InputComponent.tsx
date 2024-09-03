import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import styles from './styles';

interface CustomTextInputProps extends TextInputProps {
  withLabel?: boolean;
}

const InputComponent: React.ForwardRefRenderFunction<
  TextInput,
  CustomTextInputProps
> = (props, ref) => {
  return (
    <TextInput
      style={
        props.withLabel
          ? StyleSheet.compose(styles.input, styles.inputWithLabel)
          : styles.input
      }
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(InputComponent);
