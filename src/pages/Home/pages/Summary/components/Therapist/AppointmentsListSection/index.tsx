import React, {useEffect} from 'react';
import Container from '../../Container';
import {BaseText} from '../../../../../../../components/Text';
import {ScrollView, StyleSheet, View} from 'react-native';
import useAppointments from '../../../../../../../state/appointments';
import Loading from '../../../../../../../components/Loading';
import AppointmentCard from './AppointmentCard';

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexGrow: 1,
    gap: 10,
  },
  container: {
    maxHeight: 180,
    minHeight: 70,
  },
});

const AppointmentsListSection: React.FC = () => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();

  useEffect(() => {
    appointmentsDispatcher.fetchPendingStart();
  }, [appointmentsDispatcher]);

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Nuevas solicitudes
      </BaseText>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {appointments.fetching.isFetching &&
          appointments.fetching.config &&
          Object.keys(appointments.fetching.config).length === 0 ? (
            <Loading />
          ) : appointments.pendingList.length === 0 ? (
            <BaseText>
              Cuando tengas solicitudes a citas nuevas, aparecerán aquí.
            </BaseText>
          ) : (
            appointments.pendingList.map(app => (
              <AppointmentCard key={app.id} app={app} />
            ))
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default AppointmentsListSection;
