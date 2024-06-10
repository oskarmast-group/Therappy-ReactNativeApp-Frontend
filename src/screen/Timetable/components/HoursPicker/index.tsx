import React from 'react';
import Day from '../Day';
import HoursPickerProvider from '../../providers/HoursProvider';
import TimeAvailability from '../../../../interfaces/TimeAvailability';
import { View } from 'react-native';
import styles from './styles';

interface HoursPickerProps {
  timeAvailability: TimeAvailability;
  dates: Date[];
  updateTimeAvailability: React.Dispatch<React.SetStateAction<TimeAvailability>>;
  setWithError: (error: boolean) => void;
}

const HoursPicker: React.FC<HoursPickerProps> = ({ timeAvailability, dates, updateTimeAvailability, setWithError }) => {
  return (
    <HoursPickerProvider setWithError={setWithError}>
      <View style={styles.daysContainer}>
        {dates.map((date) => (
          <Day
            key={date.getTime()}
            date={date.getTime()}
            timeAvailability={timeAvailability}
            updateTimeAvailability={updateTimeAvailability}
          />
        ))}
      </View>
    </HoursPickerProvider>
  );
};

export default HoursPicker;
