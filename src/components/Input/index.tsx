import React, { ReactNode, RefAttributes, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TextInput, TextInputProps, TextProps, TouchableOpacity, View } from 'react-native';
import InputComponent from './components/InputComponent';
import LabelComponent from './components/LabelComponent';
import styles from './components/styles';
import EditIcon from '../../resources/img/icons/EditIcon';
import CircleCheckIcon from '../../resources/img/icons/CircleCheckIcon';
import { PRIMARY_GREEN } from '../../resources/constants/colors';

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
  iconProps?: { icon?: ReactNode; position?: IconPositions };
  editable?: boolean;
  loading?: boolean;
  onSubmit?: () => void;
}> = ({ iconProps = {}, inputProps = {}, labelProps = {}, editable = false, loading = false, onSubmit }) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { value, ...restInputProps } = inputProps;

  const { icon, position: iconPosition = IconPositions.LEADING } = iconProps;

  const { label = '', ...restLabelProps } = labelProps;

  const validValue = (!!value || value === '0') && !!label;

  const withIcon = !!icon && iconPosition !== IconPositions.NONE;

  const withLeadingIcon = withIcon && iconPosition === IconPositions.LEADING;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    onSubmit && onSubmit();
  };

  useEffect(() => {
    if (inputRef.current) {
      if (isEditing) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      {withLeadingIcon && <View style={styles.imageContainer}>{!!icon && icon}</View>}
      <View style={styles.inputContainer}>
        <InputComponent
          editable={(!editable || (editable && isEditing)) && !loading}
          value={value}
          placeholderTextColor={'#484848'}
          onFocus={() => {
            setIsActive(true);
            setIsEditing(true);
          }}
          onBlur={() => {
            setIsActive(false);
            if (editable) {
              handleSubmit();
            }
          }}
          onSubmitEditing={handleSubmit}
          ref={inputRef}
          {...restInputProps}
        />
      </View>
      {!!label && (
        <View style={styles.labelContainer}>
          <LabelComponent withIcon={withLeadingIcon} isActive={validValue || isActive} {...restLabelProps}>
            {label}
          </LabelComponent>
        </View>
      )}
      {withIcon && iconPosition === IconPositions.TRAILING && !editable && (
        <View style={styles.imageContainer}>{!!icon && icon}</View>
      )}
      {editable &&
        (loading ? (
          <ActivityIndicator color={PRIMARY_GREEN} />
        ) : (
          <TouchableOpacity style={styles.imageContainer} onPress={isEditing ? handleSubmit : handleEdit}>
            {isEditing ? <CircleCheckIcon /> : <EditIcon />}
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Input;
