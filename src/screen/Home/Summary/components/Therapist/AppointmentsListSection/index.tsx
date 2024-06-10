import React, { useEffect } from "react";
import Container from "../../Container";
import { ScrollView, StyleSheet, View } from "react-native";
import AppointmentCard from "./AppointmentCard";
import { BaseText } from "../../../../../../components/Text";
import Loading from "../../../../../../components/Loading";
import { useAppointment } from "../../../../../../context/Appointment";
import { useSocket } from "../../../../../../Socket";

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexGrow: 1,
    gap: 10,
  },
  container: {
    maxHeight: 180,
    minHeight: 70,
  },
});

const AppointmentsListSection: React.FC = () => {
  const { appointments, getPendingAppointments, loadingStates } =
    useAppointment();
  const socket = useSocket();

  const fetchAppointment = async () => {
    await getPendingAppointments();
  };
  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.off("appointment created").on("appointment created", () => {
      fetchAppointment();
    });
  }, []);

  console.log(appointments);

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Nuevas citas
      </BaseText>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {loadingStates.getPendingAppointments ? (
            <Loading />
          ) : appointments.pendingList.length === 0 ? (
            <BaseText>
              Cuando tengas solicitudes a citas nuevas, aparecerán aquí.
            </BaseText>
          ) : (
            appointments.pendingList.map((app) => (
              <AppointmentCard key={app.id} app={app} />
            ))
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default AppointmentsListSection;
