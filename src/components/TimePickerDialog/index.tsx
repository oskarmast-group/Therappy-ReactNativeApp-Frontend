import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import Button, { ButtonText } from "../Button";
import Base from "../../alert/dialog/common/Base";
import { CustomDialogProps } from "../../alert/interfaces/CustomDialogProps";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimePickerDialogProps {
  initialTime: number;
}

const TimePickerDialog: React.FC<CustomDialogProps<TimePickerDialogProps>> = ({
  open,
  onSubmit,
  onClose,
  initialTime,
}) => {
  const [time, setTime] = useState(initialTime);

  const onChangeTime = (event: any, selectedDate: any) => {
    setTime(selectedDate);
  };

  return (
    <Base open={open} onClose={onClose}>
      <View style={styles.container}>
        <DateTimePicker value={time} onChange={onChangeTime} mode={"time"} />
        <Button onPress={() => onSubmit(time)}>
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </View>
    </Base>
  );
};

export default TimePickerDialog;
