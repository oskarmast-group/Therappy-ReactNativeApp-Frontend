import { add, addDays, isAfter, isBefore, set } from 'date-fns';
import React from 'react';
import { useMemo } from 'react';
import { BaseText } from '../../../../components/Text';
import { Switch, View } from 'react-native';
import styles from './styles';
import TimeAvailability from '../../../../interfaces/TimeAvailability';
import { getDisplayDate } from '../../../../utils/date';
import TimeInterval from '../TimeInterval';
import { PRIMARY_GREEN } from '../../../../resources/constants/colors';
import uuid from 'react-native-uuid';

const Day: React.FC<{
  date: number;
  timeAvailability: TimeAvailability;
  updateTimeAvailability: React.Dispatch<React.SetStateAction<TimeAvailability>>;
}> = ({ date, timeAvailability = {}, updateTimeAvailability }) => {
  const startingHours = useMemo(() => {
    const currentDate = new Date(date);
    const nextDate = addDays(currentDate, 1);
    const hours = [];

    for (const entry of Object.entries(timeAvailability)) {
      const [, value] = entry;
      const hour = new Date(value);
      if (isAfter(hour, currentDate) && isBefore(hour, nextDate)) {
        hours.push(entry);
      }
    }

    return hours;
  }, [timeAvailability, date]);

  const toggleActive = () => {
    if (startingHours.length > 0) {
      for (const [key] of startingHours) {
        delete timeAvailability[key];
      }
      updateTimeAvailability({ ...timeAvailability });
    } else {
      const currentDate = new Date(date);
      updateTimeAvailability({
        ...timeAvailability,
        [`${uuid.v4()}`]: set(currentDate, {
          hours: 9,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }).getTime(),
      });
    }
  };

  const addInterval = () => {
    const lastTime = new Date(startingHours[startingHours.length - 1][1]);

    updateTimeAvailability({
      ...timeAvailability,
      [`${uuid.v4()}`]: add(lastTime, { hours: 1 }).getTime(),
    });
  };

  const removeInterval = (key: string) => () => {
    delete timeAvailability[key];
    updateTimeAvailability({ ...timeAvailability });
  };

  const setInterval = (key: string) => (value: number) => {
    timeAvailability[key] = value;
    updateTimeAvailability({ ...timeAvailability });
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Switch
          trackColor={{ false: '#ccc', true: PRIMARY_GREEN }}
          thumbColor={'white'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleActive}
          value={startingHours.length > 0}
        />
        <BaseText weight={600}>{getDisplayDate(date, 'EEEE d')}</BaseText>
      </View>
      <View style={styles.hoursContainer}>
        {startingHours.map((hour, i, hours) => (
          <TimeInterval
            key={i}
            hour={hour[1]}
            hoursCount={startingHours.length}
            isLast={startingHours.length - 1 === i}
            addInterval={addInterval}
            removeInterval={removeInterval(hour[0])}
            setInterval={setInterval(hour[0])}
            previousValue={i > 0 ? hours[i - 1][1] : null}
          />
        ))}
      </View>
    </View>
  );
};

export default Day;
