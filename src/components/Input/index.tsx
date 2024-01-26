import React, {ReactNode, RefAttributes, useState} from 'react';
import Container from './components/Container';
import {TextInput, TextInputProps, TextProps} from 'react-native';
import ImageContainer from './components/ImageContainer';
import InputComponent from './components/InputComponent';
import InputContainer from './components/InputContainer';
import LabelContainer from './components/LabelContainer';
import LabelComponent from './components/LabelComponent';

interface LabelProps extends TextProps {
  label?: string;
}

enum IconPositions {
  LEADING = 'leading',
  TRAILING = 'trailing',
  NONE = 'none',
}

const Input: React.FC<{
  labelProps?: LabelProps;
  inputProps?: TextInputProps & RefAttributes<TextInput>;
  iconProps?: {icon?: ReactNode; position?: IconPositions};
}> = ({iconProps = {}, inputProps = {}, labelProps = {}}) => {
  const [isActive, setIsActive] = useState(false);

  const defaultInputProps = {type: 'text'};
  const {value, ...restInputProps} = inputProps;
  const mergedInputProps = {...defaultInputProps, ...restInputProps};

  const {icon, position: iconPosition = IconPositions.LEADING} = iconProps;

  const {label = '', ...restLabelProps} = labelProps;

  const validValue = (!!value || value === '0') && !!label;

  const withIcon = !!icon && iconPosition !== IconPositions.NONE;

  const withLeadingIcon = withIcon && iconPosition === IconPositions.LEADING;

  return (
    <Container>
      {withLeadingIcon && <ImageContainer>{!!icon && icon}</ImageContainer>}
      <InputContainer>
        <InputComponent
          value={value}
          placeholderTextColor={'#484848'}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          {...mergedInputProps}
        />
      </InputContainer>
      {!!label && (
        <LabelContainer>
          <LabelComponent
            withIcon={withLeadingIcon}
            isActive={validValue || isActive}
            {...restLabelProps}>
            {label}
          </LabelComponent>
        </LabelContainer>
      )}
      {withIcon && iconPosition === IconPositions.TRAILING && (
        <ImageContainer>{!!icon && icon}</ImageContainer>
      )}
    </Container>
  );
};

export default Input;
