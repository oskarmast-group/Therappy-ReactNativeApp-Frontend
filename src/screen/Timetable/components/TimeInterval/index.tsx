import React from 'react';
import { add, addMinutes, isBefore } from 'date-fns';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import RemoveIcon from '../../../../resources/img/icons/RemoveIcon';
import AddIcon from '../../../../resources/img/icons/AddIcon';
import { dateFormat } from '../../../../utils/date';
import { useHoursPicker } from '../../providers/HoursProvider';
import { useAlert } from '../../../../alert';
import ALERT_TYPES from '../../../../alert/interfaces/AlertTypes';
import TimePickerDialog from '../../../../components/TimePickerDialog';
import uuid from 'react-native-uuid';
import { BaseText } from '../../../../components/Text';

interface TimePickerProps {
  hour: number;
  setHour: (hour: number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ hour, setHour }) => {
  const alert = useAlert();

  const onChangeTime = () => {
    console.log('hour', hour);
    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: TimePickerDialog,
        props: {
          initialTime: new Date(hour),
        },
      },
    })
      .then((time) => {
        setHour(time.getTime());
      })
      .catch(() => {});
  };

  return (
    <TouchableOpacity style={styles.timeButton} onPress={onChangeTime}>
      <BaseText textAlign={'center'} fontSize={14}>
        {dateFormat(new Date(hour), 'h:mm a')}
      </BaseText>
    </TouchableOpacity>
  );
};

interface TimeIntervalProps {
  hour: number;
  hoursCount: number;
  isLast: boolean;
  addInterval: () => void;
  removeInterval: () => void;
  setInterval: (hour: number) => void;
  previousValue?: number | null;
}

const TimeInterval: React.FC<TimeIntervalProps> = ({
  hour,
  hoursCount,
  isLast,
  addInterval,
  removeInterval,
  setInterval,
  previousValue = null,
}) => {
  const dispatch = useHoursPicker();
  const uniqueId = useMemo(() => `${uuid.v4()}`, []);

  const changeFirst = (h: number) => {
    setInterval(h);
  };

  useEffect(() => {
    return () => {
      dispatch({ type: 'REMOVE_ERROR', id: uniqueId });
    };
  }, [uniqueId, dispatch]);

  const hasError = useMemo(() => {
    if (!previousValue) {
      return false;
    }
    const previousTime = new Date(previousValue);
    const previousEnd = addMinutes(previousTime, 55);

    const currentTime = new Date(hour);

    return isBefore(currentTime, previousEnd);
  }, [hour, previousValue]);

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', id: uniqueId, error: hasError });
  }, [dispatch, hasError, uniqueId]);

  return (
    <View style={hasError ? StyleSheet.compose(styles.container, styles.errorContainer) : styles.container}>
      <TimePicker hour={hour} setHour={changeFirst} />
      <BaseText fontSize={14}>{`- ${dateFormat(add(new Date(hour), { minutes: 50 }), 'h:mm a')}`}</BaseText>
      {hoursCount === 1 ? (
        <TouchableOpacity style={styles.intervalButton} onPress={addInterval}>
          <AddIcon />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.intervalButton} onPress={removeInterval}>
            <View style={styles.iconContainer}>
              <RemoveIcon />
            </View>
          </TouchableOpacity>
          {isLast && (
            <TouchableOpacity style={styles.intervalButton} onPress={addInterval}>
              <View style={styles.iconContainer}>
                <AddIcon />
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default TimeInterval;
