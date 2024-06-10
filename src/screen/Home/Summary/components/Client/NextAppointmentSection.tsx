import React, { useEffect, useMemo } from "react";
import Container from "../Container";
import { useAppointment } from "../../../../../context/Appointment";
import { useSocket } from "../../../../../Socket";
import AppointmentStatus from "../../../../../types/Appointment/AppointmentStatus";
import { BaseText } from "../../../../../components/Text";
import AppointmentCard from "../../../../../components/AppointmentCard";

const NextAppointmentSection: React.FC = () => {
  const { appointments, getUpcomingAppointments, loadingStates } =
    useAppointment();
  const socket = useSocket();

  const fetchUpcomingAppointment = async () => {
    await getUpcomingAppointments();
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.off("appointment updated").on("appointment updated", () => {
      getUpcomingAppointments();
    });
  }, []);

  const upcomingAppointments = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({ status }) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED
      ),
    [appointments]
  );

  return upcomingAppointments.length > 0 ? (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={16} marginBottom={4}>
        Cita próxima
      </BaseText>
      <AppointmentCard
        app={
          upcomingAppointments
            .sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
            .filter(({ status }) => status !== AppointmentStatus.REJECTED)[0]
        }
      />
    </Container>
  ) : null;
};

export default NextAppointmentSection;
