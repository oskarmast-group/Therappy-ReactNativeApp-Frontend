import React, { useMemo } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { BaseAppointment } from '../../../../../../interfaces/Appointment';
import { BaseText } from '../../../../../../components/Text';
import { dateFormat, getDisplayDate } from '../../../../../../utils/date';
import AppointmentCard from '../../../../../../components/AppointmentCard';

const AppointmentsList: React.FC<{ list: BaseAppointment[] }> = ({ list }) => {
  const dates = useMemo(() => {
    const newDates: { [key: string]: BaseAppointment[] } = {};
    for (const app of list) {
      const { date } = app;
      const dateStr = dateFormat(date);
      if (newDates[dateStr] === undefined) {
        newDates[dateStr] = [app];
      } else {
        newDates[dateStr] = [...newDates[dateStr], app];
      }
    }
    return newDates;
  }, [list]);

  return (
    <View style={styles.container}>
      {Object.keys(dates).map((key) => (
        <View key={key} style={styles.dateContainer}>
          <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
            {key === dateFormat(new Date()) ? 'Hoy' : getDisplayDate(new Date(`${key}T12:00:00`), 'EEEE')} -{' '}
            {getDisplayDate(new Date(`${key}T12:00:00`), 'MMMM d, yyyy')}
          </BaseText>
          {dates[key].map((app) => (
            <AppointmentCard key={app.roomId} app={app} withDate={false} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default AppointmentsList;
