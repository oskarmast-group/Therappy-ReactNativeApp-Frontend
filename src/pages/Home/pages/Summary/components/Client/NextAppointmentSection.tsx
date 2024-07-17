import React, {useEffect, useMemo} from 'react';
import Container from '../Container';
import {BaseText} from '../../../../../../components/Text';
import useAppointments from '../../../../../../state/appointments';
import AppointmentStatus from '../../../../../../interfaces/Appointment/AppointmentStatus';
import {useSocket} from '../../../../../../Socket';
import AppointmentCard from '../../../../../../components/AppointmentCard';

const NextAppointmentSection: React.FC = () => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.off('appointment updated').on('appointment updated', () => {
      appointmentsDispatcher.fetchUpcomingStart();
    });
  }, [socket, appointmentsDispatcher]);

  const upcomingAppointments = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({status}) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED,
      ),
    [appointments],
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
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .filter(({status}) => status !== AppointmentStatus.REJECTED)[0]
        }
      />
    </Container>
  ) : null;
};

export default NextAppointmentSection;
