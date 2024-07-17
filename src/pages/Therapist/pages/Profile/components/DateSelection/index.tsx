import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, Text} from 'react-native';
import styles, {DateContainer, HourContainer} from './styles';
import Button, {ButtonText} from '../../../../../../components/Button';
import {useNavigate} from 'react-router-native';
import useAppointments from '../../../../../../state/appointments';
import TimeAvailability from '../../../../../../interfaces/TimeAvailability';
import {PublicAppointment} from '../../../../../../interfaces/Appointment';
import {addDays, set} from 'date-fns';
import {checkDay, getHours, isAvailable} from './utils';
import {BaseText} from '../../../../../../components/Text';
import {
  DARKER_TEXT,
  PRIMARY_GREEN,
} from '../../../../../../resources/constants/colors';
import {dayOfTheWeekTranslatedAbr} from '../../../../../../utils/text';
import {getDisplayTime} from '../../../../../../utils/time';

const DateSelection: React.FC<{
  therapistId: number;
  timeAvailability: TimeAvailability;
  appointments: PublicAppointment[];
}> = ({therapistId, timeAvailability, appointments}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const {data: appointmentsState, dispatcher: appointmentsDispatcher} =
    useAppointments();

  useEffect(() => {
    appointmentsDispatcher.getServerTimeStart();
  }, [appointmentsDispatcher]);

  const dates = useMemo(() => {
    if (!appointmentsState.serverTime || !timeAvailability) {
      return [];
    }
    const days: Date[] = [];
    const today = set(new Date(appointmentsState.serverTime), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    let daySelected = null;
    for (let i = 1; i <= 8; i++) {
      const day = addDays(today, i);
      days.push(day);
      if (!daySelected && checkDay(timeAvailability, day)) {
        daySelected = day;
      }
    }
    setSelectedDate(daySelected);
    return days;
  }, [appointmentsState.serverTime, timeAvailability]);

  const hours = useMemo(
    () => (selectedDate ? getHours(timeAvailability, selectedDate) : []),
    [timeAvailability, selectedDate],
  );

  useEffect(() => {
    for (const hour of hours) {
      if (isAvailable(hour, appointments)) {
        setSelectedHour(hour);
        return;
      }
    }
    setSelectedHour(null);
  }, [hours, appointments]);

  const reserveAppointment = (time: Date | null) => {
    if (!time) {
      return;
    }
    const dateTime = new Date(time);

    appointmentsDispatcher.reserveStart({
      therapistId,
      dateISO: dateTime.toISOString(),
    });
  };

  useEffect(() => {
    if (appointmentsState.reservation) {
      navigate(
        `/cita/nueva/${appointmentsState.reservation.appointment.roomId}`,
        {
          state: {therapistId},
          replace: false,
        },
      );
    }
  }, [appointmentsState.reservation, navigate, therapistId]);

  return (
    <>
      <ScrollView
        style={styles.datesContainerScroll}
        contentContainerStyle={styles.datesContainer}
        horizontal={true}>
        {dates.map(d => (
          <DateContainer
            key={d.getTime()}
            inactive={!checkDay(timeAvailability, d)}
            selected={selectedDate === d}
            onPress={() => setSelectedDate(d)}>
            <BaseText color={selectedDate === d ? 'white' : DARKER_TEXT}>
              {dayOfTheWeekTranslatedAbr[d.getDay()]}
            </BaseText>
            <BaseText
              color={selectedDate === d ? 'white' : DARKER_TEXT}
              fontSize={28}
              weight={700}>
              {d.getDate()}
            </BaseText>
          </DateContainer>
        ))}
      </ScrollView>
      <ScrollView
        style={styles.hoursContainerScroll}
        contentContainerStyle={styles.hoursContainer}
        horizontal={true}>
        {hours.map(h => (
          <HourContainer
            key={h.getTime()}
            inactive={!isAvailable(h, appointments)}
            selected={selectedHour === h}
            onPress={() => setSelectedHour(h)}>
            <BaseText
              color={selectedHour === h ? 'white' : DARKER_TEXT}
              opacity={isAvailable(h, appointments) ? 1 : 0.3}>
              {getDisplayTime(h)}
            </BaseText>
            {!isAvailable(h, appointments) && (
              <Text style={styles.banner}>Ocupado</Text>
            )}
          </HourContainer>
        ))}
      </ScrollView>
      <Button
        onPress={() => reserveAppointment(selectedHour)}
        disabled={
          selectedHour === null || appointmentsState.fetching.isFetching
        }>
        {appointmentsState.fetching.isFetching ? (
          <ActivityIndicator color={PRIMARY_GREEN} size={22} />
        ) : (
          <ButtonText>Agendar</ButtonText>
        )}
      </Button>
    </>
  );
};

export default DateSelection;
