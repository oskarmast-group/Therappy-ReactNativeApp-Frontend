import React, {useMemo} from 'react';
import Container from '../Container';
import {BaseText} from '../../../../../../components/Text';
import useAppointments from '../../../../../../state/appointments';
import AppointmentStatus from '../../../../../../interfaces/Appointment/AppointmentStatus';
import AppointmentCard from '../../../../../../components/AppointmentCard';

const NextAppointmentSection: React.FC = () => {
  const {data: appointments} = useAppointments();

  const upcomingAppointments = useMemo(
    () =>
      appointments.upcomingList
        .filter(
          ({status}) =>
            status !== AppointmentStatus.REJECTED &&
            status !== AppointmentStatus.CANCELLED,
        )
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .slice(0, 3),
    [appointments],
  );

  return upcomingAppointments.length > 0 ? (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={16} marginBottom={4}>
        Citas próximas
      </BaseText>
      {upcomingAppointments.map(app => (
        <AppointmentCard key={app.id} app={app} />
      ))}
    </Container>
  ) : null;
};

export default NextAppointmentSection;
