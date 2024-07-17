import React, {useState} from 'react';
import {CustomDialogProps} from '../../../alert/interfaces/CustomDialogProps';
import Base from '../../../alert/dialog/common/Base';
import ActionsContainer from '../../../alert/dialog/common/ActionsContainer';
import Button, {ButtonText, CancelButton} from '../../Button';
import {PRIMARY_GREEN} from '../../../resources/constants/colors';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';

const CalendarDialog: React.FC<
  CustomDialogProps<Date, {date: string | number | Date | undefined}>
> = ({open, onSubmit, onClose, props}) => {
  const [selectedDate, setDate] = useState(
    props.date ? new Date(props.date) : new Date(),
  );

  const onConfirm = () => {
    onSubmit(selectedDate);
  };

  const handleDateChange = (d: DateType) => {
    if (d) {
      setDate(new Date(d.toString()));
    }
  };

  return (
    <Base open={open} onClose={onClose} showCloseButton={true}>
      <DateTimePicker
        mode="single"
        date={selectedDate}
        onChange={params => handleDateChange(params.date)}
        selectedItemColor={PRIMARY_GREEN}
      />
      <ActionsContainer>
        <CancelButton onPress={onClose} flex={1}>
          <ButtonText color={PRIMARY_GREEN}>Cancelar</ButtonText>
        </CancelButton>
        <Button onPress={onConfirm} flex={1}>
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </ActionsContainer>
    </Base>
  );
};

export default CalendarDialog;
