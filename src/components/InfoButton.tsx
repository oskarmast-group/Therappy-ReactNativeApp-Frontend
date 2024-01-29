import React, {ReactNode} from 'react';
import Button from './Button';
import {StyleSheet, TouchableOpacityProps, View} from 'react-native';
import {BaseText, TextProps} from './Text';
import InfoIcon from '../resources/img/icons/InfoIcon';

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
}

interface InfoButtonProps {
  buttonProps?: ButtonProps;
  textProps?: TextProps;
  text: string;
  icon?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 33,
    height: 33,
  },
});

const InfoButton: React.FC<InfoButtonProps> = ({
  text,
  buttonProps,
  icon,
  textProps = {},
}) => {
  return (
    <Button {...buttonProps}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{icon ? icon : <InfoIcon />}</View>
        <BaseText fontSize={14} color="white" {...textProps}>
          {text}
        </BaseText>
      </View>
    </Button>
  );
};

export default InfoButton;
