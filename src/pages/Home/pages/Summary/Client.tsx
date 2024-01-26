import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Container from './components/Container';
import useAppointments from '../../../../state/appointments';

const Client: React.FC = () => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();

  useEffect(() => {
    appointmentsDispatcher.fetchUpcomingStart();
  }, [appointmentsDispatcher]);

  console.log(appointments.upcomingList);

  return (
    <Container>
      <Text>Client</Text>
    </Container>
  );
};

export default Client;
