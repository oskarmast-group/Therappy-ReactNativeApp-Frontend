import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styles, { DateContainer, HourContainer } from "./styles";
import { ButtonText } from "../../../../../../components/Button";
import { Link } from "react-router-native";
import TimeAvailability from "../../../../../../interfaces/TimeAvailability";
import { PublicAppointment } from "../../../../../../interfaces/Appointment";
import { addDays, set } from "date-fns";
import { checkDay, getHours, isAvailable } from "./utils";
import { BaseText } from "../../../../../../components/Text";
import { DARKER_TEXT } from "../../../../../../resources/constants/colors";
import { dayOfTheWeekTranslatedAbr } from "../../../../../../utils/text";
import { getDisplayTime } from "../../../../../../utils/time";
import { useAppointment } from "../../../../../../context/Appointment";

const DateSelection: React.FC<{
  therapistId: number;
  timeAvailability: TimeAvailability;
  appointments: PublicAppointment[];
}> = ({ therapistId, timeAvailability, appointments }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const [serverTime, setServerTime] = useState<{ now: number } | null>(null);
  const { getServerTime, loadingStates } = useAppointment();

  useEffect(() => {
    const fetchServertime = async () => {
      const res = await getServerTime();
      if (res) setServerTime(res);
    };
    fetchServertime();
  }, []);

  const dates = useMemo(() => {
    if (!serverTime || !timeAvailability) {
      return [];
    }
    const days: Date[] = [];
    const today = set(new Date(serverTime.now), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    let daySelected = null;
    for (let i = 0; i <= 7; i++) {
      const day = addDays(today, i);
      days.push(day);
      if (!daySelected && checkDay(timeAvailability, day)) {
        daySelected = day;
      }
    }
    setSelectedDate(daySelected);
    return days;
  }, [serverTime, timeAvailability]);

  const hours = useMemo(
    () => (selectedDate ? getHours(timeAvailability, selectedDate) : []),
    [timeAvailability, selectedDate]
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
  return (
    <View>
      <ScrollView
        style={styles.datesContainerScroll}
        contentContainerStyle={styles.datesContainer}
        horizontal={true}
      >
        {dates.map((d) => (
          <DateContainer
            key={d.getTime()}
            inactive={!checkDay(timeAvailability, d)}
            selected={selectedDate === d}
            onPress={() => setSelectedDate(d)}
          >
            <BaseText color={selectedDate === d ? "white" : DARKER_TEXT}>
              {dayOfTheWeekTranslatedAbr[d.getDay()]}
            </BaseText>
            <BaseText
              color={selectedDate === d ? "white" : DARKER_TEXT}
              fontSize={28}
              weight={700}
            >
              {d.getDate()}
            </BaseText>
          </DateContainer>
        ))}
      </ScrollView>
      <ScrollView
        style={styles.hoursContainerScroll}
        contentContainerStyle={styles.hoursContainer}
        horizontal={true}
      >
        {hours.map((h) => (
          <HourContainer
            key={h.getTime()}
            inactive={!isAvailable(h, appointments)}
            selected={selectedHour === h}
            onPress={() => isAvailable(h, appointments) && setSelectedHour(h)}
          >
            <BaseText
              color={selectedHour === h ? "white" : DARKER_TEXT}
              opacity={isAvailable(h, appointments) ? 1 : 0.3}
            >
              {getDisplayTime(h)}
            </BaseText>
            {!isAvailable(h, appointments) && (
              <Text style={styles.banner}>Ocupado</Text>
            )}
          </HourContainer>
        ))}
      </ScrollView>
      <Link
        to={"/appointment"}
        state={{
          date: selectedDate,
          time: selectedHour,
          therapistId,
        }}
        disabled={selectedHour === null}
      >
        <View
          style={
            selectedHour === null
              ? StyleSheet.compose(styles.button, styles.buttonDisabled)
              : styles.button
          }
        >
          <ButtonText>Agendar</ButtonText>
        </View>
      </Link>
    </View>
  );
};

export default DateSelection;
