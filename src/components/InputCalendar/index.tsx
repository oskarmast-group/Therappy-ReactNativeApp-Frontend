import React, { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native';
import styles from './components/styles';
import { PRIMARY_GREEN } from '../../resources/constants/colors';
import { BaseText } from '../Text';
import { getDisplayDate } from '../../utils/date';
import CalendarIcon from '../../resources/img/icons/CalendarIcon';
import { useAlert } from '../../alert';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import CalendarDialog from './components/CalendarDialog';

interface LabelProps extends TextProps {
  label?: string;
}

interface InputProps {
  value?: string | number | Date;
}

enum IconPositions {
  LEADING = 'leading',
  NONE = 'none',
}

const InputCalendar: React.FC<{
  labelProps?: LabelProps;
  inputProps?: InputProps;
  iconProps?: { icon?: ReactNode; position?: IconPositions };
  loading?: boolean;
  onSubmit: (date: Date) => void;
}> = ({ iconProps = {}, inputProps = {}, labelProps = {}, loading = false, onSubmit }) => {
  const { value } = inputProps;
  const { icon, position: iconPosition = IconPositions.LEADING } = iconProps;
  const { label = '', ...restLabelProps } = labelProps;

  const withIcon = !!icon && iconPosition !== IconPositions.NONE;
  const withLeadingIcon = withIcon && iconPosition === IconPositions.LEADING;
  const formattedValue = value ? getDisplayDate(value) : 'Selecciona una fecha';

  const alert = useAlert<Date, { date: string | number | Date | undefined }>();

  const handleEdit = () => {
    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: CalendarDialog,
        props: {
          date: value,
        },
      },
    })
      .then((date) => {
        onSubmit(date);
      })
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      {withLeadingIcon && <View style={styles.imageContainer}>{!!icon && icon}</View>}
      <View style={styles.inputContainer}>
        <BaseText fontSize={16}>{formattedValue}</BaseText>
      </View>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text
            style={withLeadingIcon ? StyleSheet.compose(styles.label, styles.labelWithIcon) : styles.label}
            {...restLabelProps}
          >
            {label}
          </Text>
        </View>
      )}
      {loading ? (
        <ActivityIndicator color={PRIMARY_GREEN} />
      ) : (
        <TouchableOpacity style={styles.imageContainer} onPress={handleEdit}>
          <CalendarIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputCalendar;
