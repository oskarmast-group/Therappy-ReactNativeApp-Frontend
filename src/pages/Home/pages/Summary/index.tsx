import React from 'react';
import {StyleSheet, View} from 'react-native';
import Scrollable from '../../../../containers/Scrollable';
import useUser from '../../../../state/user';
import {BaseText} from '../../../../components/Text';
import {DARKER_TEXT, DARK_TEXT} from '../../../../resources/constants/colors';
import Therapist from './components/Therapist';
import Client from './components/Client';
import UserType from '../../../../interfaces/User/UserType';
import useAppointments from '../../../../state/appointments';
import useTherapist from '../../../../state/therapists';

const Summary: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const {dispatcher: appointmentsDispatcher} = useAppointments();
  const {dispatcher: therapistsDispatcher} = useTherapist();
  return (
    <Scrollable
      onRefresh={() => {
        userDispatcher.fetchStart();
        appointmentsDispatcher.fetchPendingStart();
        appointmentsDispatcher.fetchUpcomingStart();
        therapistsDispatcher.fetchStart();
      }}
      refreshing={user.fetching.fetch.isFetching}>
      <View style={styles.header}>
        <View style={styles.saluteContainer}>
          <BaseText fontSize={28} weight={600} color={DARKER_TEXT}>
            Hola,{' '}
          </BaseText>
          <BaseText fontSize={28} weight={700}>
            {user?.current?.name ?? ''}
          </BaseText>
        </View>
        <BaseText fontSize={21} weight={600} color={DARK_TEXT}>
          ¿Cómo te encuentras hoy?
        </BaseText>
      </View>
      {user?.current && (
        <>
          {user.current.userType === UserType.THERAPIST && (
            <Therapist user={user.current} />
          )}
          {user.current.userType === UserType.CLIENT && (
            <Client user={user.current} />
          )}
        </>
      )}
    </Scrollable>
  );
};

export default Summary;

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    minHeight: 0,
  },
  saluteContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
