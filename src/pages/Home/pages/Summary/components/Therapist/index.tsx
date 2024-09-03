import React, {useEffect} from 'react';
import Container from '../Container';
import {Therapist as TherapistInterface} from '../../../../../../interfaces/User';
import TherapistStatus from '../../../../../../interfaces/User/TherapistStatus';
import AppointmentsListSection from './AppointmentsListSection';
import PatientListSection from './PatientListSection';
import RequiredDocumentation from './RequiredDocumentation';
import NextAppointmentSection from './NextAppointmentSection';
import useAppointments from '../../../../../../state/appointments';
import {useSocket} from '../../../../../../Socket';

const Therapist: React.FC<{user: TherapistInterface}> = ({user}) => {
  const {dispatcher: appointmentsDispatcher} = useAppointments();
  const socket = useSocket();

  useEffect(() => {
    appointmentsDispatcher.fetchPendingStart();
    appointmentsDispatcher.fetchUpcomingStart();
  }, [appointmentsDispatcher]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.off('appointment created').on('appointment created', () => {
      console.log('Appointment created');
      appointmentsDispatcher.fetchPendingStart();
      appointmentsDispatcher.fetchUpcomingStart();
    });

    socket.off('appointment updated').on('appointment updated', () => {
      appointmentsDispatcher.fetchPendingStart();
      appointmentsDispatcher.fetchUpcomingStart();
      console.log('Appointment updated');
    });
  }, [socket, appointmentsDispatcher]);

  return (
    <Container>
      {user.extraData?.status === TherapistStatus.ACTIVE && (
        <>
          <AppointmentsListSection />
          <NextAppointmentSection />
          <PatientListSection user={user} />
        </>
      )}
      {(user.extraData?.status === TherapistStatus.PENDING ||
        user.extraData?.status === TherapistStatus.REGISTERED) && (
        <RequiredDocumentation />
      )}
    </Container>
  );
};

export default Therapist;
