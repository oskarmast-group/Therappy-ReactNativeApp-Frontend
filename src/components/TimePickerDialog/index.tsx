import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Button, {ButtonText} from '../Button';
import Base from '../../alert/dialog/common/Base';
import {CustomDialogProps} from '../../alert/interfaces/CustomDialogProps';
import DatePicker from 'react-native-date-picker';

interface TimePickerDialogProps {
  initialTime: number;
}

const TimePickerDialog: React.FC<CustomDialogProps<TimePickerDialogProps>> = ({
  open,
  onSubmit,
  onClose,
  props,
}) => {
  const [time, setTime] = useState(props.initialTime);

  const onChangeTime = (selectedTime: Date) => {
    setTime(selectedTime);
  };

  return (
    <Base open={open} onClose={onClose}>
      <View style={styles.container}>
        <DatePicker date={time} onDateChange={onChangeTime} mode={'time'} />
        <Button onPress={() => onSubmit(time)}>
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </View>
    </Base>
  );
};

export default TimePickerDialog;
