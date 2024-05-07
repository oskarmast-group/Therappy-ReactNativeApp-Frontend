import React, { ReactNode } from 'react';
import Button, { ButtonProps } from './Button';
import { StyleSheet, View } from 'react-native';
import { BaseText, TextProps } from './Text';
import InfoIcon from '../resources/img/icons/InfoIcon';

interface InfoButtonProps {
  buttonProps?: ButtonProps;
  textProps?: TextProps;
  content: string | ReactNode;
  icon?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flexShrink: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
  },
});

const InfoButton: React.FC<InfoButtonProps> = ({ content, buttonProps, icon, textProps = {} }) => {
  return (
    <Button {...buttonProps}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{icon ? icon : <InfoIcon />}</View>
        {typeof content === 'string' ? (
          <BaseText fontSize={14} color="white" {...textProps}>
            {content}
          </BaseText>
        ) : (
          content
        )}
      </View>
    </Button>
  );
};

export default InfoButton;
