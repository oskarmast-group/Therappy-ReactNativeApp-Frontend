import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BaseText } from "../Text";
import { getDisplayDate } from "../../utils/date";
import { getDisplayTime } from "../../utils/time";
import { add } from "date-fns";
import { PRIMARY_GREEN } from "../../resources/constants/colors";

const AppointmentTime: React.FC<{ loading: boolean; date?: string }> = ({
  loading,
  date,
}) => {
  return (
    <View>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Horario de la cita
      </BaseText>
      {loading && <ActivityIndicator color={PRIMARY_GREEN} />}
      {!loading && date && (
        <BaseText>{getDisplayDate(date, "EEEE - MMMM d, yyyy")}</BaseText>
      )}
      {!loading && date && (
        <BaseText>
          {getDisplayTime(date)} -{" "}
          {getDisplayTime(add(new Date(date), { minutes: 50 }))}
        </BaseText>
      )}
    </View>
  );
};

export default AppointmentTime;
