import React, { useEffect, useMemo, useState } from "react";
import { BaseText } from "../../../../components/Text";
import { PRIMARY_GREEN } from "../../../../resources/constants/colors";
import Loading from "../../../../components/Loading";
import { sub } from "date-fns";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import AppointmentsList from "./components/AppointmentsList";
import { useAppointment } from "../../../../context/Appointment";
import Scrollable from "../../../../components/containers/Scrollable";

const Calendar: React.FC = () => {
  const [page, setPage] = useState(0);
  const { appointments, getAllAppointments, loadingStates } = useAppointment();

  useEffect(() => {
    getAllAppointments();
  }, []);

  const list = useMemo(() => {
    if (!appointments.list) {
      return [];
    }

    if (page === 0) {
      const appointmentsList = appointments.list.filter(
        ({ date }) => new Date(date) > sub(new Date(), { hours: 1 })
      );
      const sorted = appointmentsList.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      return sorted;
    } else {
      const appointmentsList = appointments.list.filter(
        ({ date }) => new Date(date) < sub(new Date(), { hours: 1 })
      );
      const sorted = appointmentsList.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return sorted;
    }
  }, [appointments.list, page]);

  return (
    <Scrollable>
      <BaseText
        fontSize={30}
        weight={600}
        color={PRIMARY_GREEN}
        textAlign={"center"}
        marginBottom={10}
      >
        Citas
      </BaseText>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={
            page === 0
              ? StyleSheet.compose(styles.tab, styles.tabActive)
              : styles.tab
          }
          onPress={() => setPage(0)}
        >
          <BaseText
            color={page === 0 ? "white" : PRIMARY_GREEN}
            textAlign={"center"}
          >
            Próximas
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            page === 1
              ? StyleSheet.compose(styles.tab, styles.tabActive)
              : styles.tab
          }
          onPress={() => setPage(1)}
        >
          <BaseText
            color={page === 1 ? "white" : PRIMARY_GREEN}
            textAlign={"center"}
          >
            Pasadas
          </BaseText>
        </TouchableOpacity>
      </View>
      {loadingStates.getAllAppointments ? (
        <Loading />
      ) : list?.length === 0 ? (
        <BaseText marginTop={20} textAlign={"center"}>
          {page === 0
            ? "Cuando tengas citas pendientes apareceran aquí"
            : "Tu historial de citas aparecerá aquí"}
        </BaseText>
      ) : (
        <AppointmentsList list={list} />
      )}
    </Scrollable>
  );
};

export default Calendar;
