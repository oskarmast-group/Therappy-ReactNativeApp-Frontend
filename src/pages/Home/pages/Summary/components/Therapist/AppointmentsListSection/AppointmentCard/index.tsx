import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import styles from './styles';
import {Link} from 'react-router-native';
import {BaseAppointment} from '../../../../../../../../interfaces/Appointment';
import ProfileIcon from '../../../../../../../../resources/img/icons/ProfileIcon';
import {BaseText} from '../../../../../../../../components/Text';
import {getDisplayDate} from '../../../../../../../../utils/date';
import {IMAGES_URL} from '../../../../../../../../resources/constants/urls';
import Button, {ButtonText} from '../../../../../../../../components/Button';
import useAppointments from '../../../../../../../../state/appointments';
import {subscribeNotificationsIfNotAlready} from '../../../../../../../../utils/notifications';

const AppointmentCard: React.FC<{app: BaseAppointment}> = ({app}) => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();

  const onAccept = (id: number) => {
    appointmentsDispatcher.acceptStart(id);
    subscribeNotificationsIfNotAlready();
  };

  return (
    <View style={styles.container}>
      <Link to={`/cita/${app.roomId}`}>
        <View style={styles.linkChildrenContainer}>
          <View style={styles.imageContainer}>
            {app.profileImg ? (
              <Image
                style={styles.image}
                source={{uri: `${IMAGES_URL}${app.profileImg}`}}
              />
            ) : (
              <ProfileIcon />
            )}
          </View>
          <View style={styles.informationContainer}>
            <BaseText fontSize={20} marginBottom={2} weight={700}>{`${
              app.title ? `${app.title} ` : ''
            }${app.name} ${app.lastName}`}</BaseText>
            <BaseText>
              {getDisplayDate(app.date, 'EEEE - MMMM d, yyyy')}
            </BaseText>
          </View>
        </View>
      </Link>
      <Button
        paddingTop={5}
        paddingBottom={5}
        width={'50%'}
        flex={1}
        onPress={() => onAccept(app.id)}
        disabled={
          appointments.fetching.isFetching &&
          appointments.fetching.config?.key === 'accept'
        }>
        {appointments.fetching.isFetching &&
        appointments.fetching.config?.key === 'accept' ? (
          <ActivityIndicator color={'#fbfbfd'} />
        ) : (
          <ButtonText>Aceptar</ButtonText>
        )}
      </Button>
    </View>
  );
};

export default AppointmentCard;
