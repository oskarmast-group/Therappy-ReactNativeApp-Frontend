import React from 'react';
import {Image, View} from 'react-native';
import {Link} from 'react-router-native';
import {BaseAppointment} from '../../interfaces/Appointment';
import {IMAGES_URL} from '../../resources/constants/urls';
import styles from './styles';
import {BaseText} from '../Text';
import ProfileIcon from '../../resources/img/icons/ProfileIcon';
import {getDisplayDate} from '../../utils/date';
import {getDisplayTime} from '../../utils/time';
import {add} from 'date-fns';
import {getStatusText} from '../../utils/text';
import {getStatusColor} from '../../utils';

const AppointmentCard: React.FC<{
  app: BaseAppointment;
  withDate?: boolean;
  withImage?: boolean;
}> = ({app, withDate = true, withImage = true}) => {
  return (
    <View style={styles.container}>
      <Link to={`/cita/${app.roomId}`} underlayColor={'transparent'}>
        <View style={styles.linkChildrenContainer}>
          {withImage && (
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
          )}
          <View style={styles.informationContainer}>
            <BaseText fontSize={18} marginBottom={5}>{`${app.title ?? ''} ${
              app.name
            } ${app.lastName}`}</BaseText>
            {withDate && (
              <BaseText>
                {getDisplayDate(app.date, 'EEEE - MMMM d, yyyy')}
              </BaseText>
            )}
            <BaseText>
              {getDisplayTime(app.date)} -{' '}
              {getDisplayTime(add(new Date(app.date), {minutes: 50}))}
            </BaseText>
            <BaseText color={getStatusColor(app)}>
              {getStatusText(app)}
            </BaseText>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default AppointmentCard;
