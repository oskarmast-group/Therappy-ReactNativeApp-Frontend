import React, { useEffect, useMemo, useState } from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import { BaseText } from '../../components/Text';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { GREEN } from '../../resources/constants/colors';
import Loading from '../../components/Loading';
import styles from './styles';
import useUser from '../../state/user';
import useAppointments from '../../state/appointments';
import { add, isAfter, set } from 'date-fns';
import UserType from '../../interfaces/User/UserType';
import { useNavigate } from 'react-router-native';
import TimeAvailability from '../../interfaces/TimeAvailability';
import HoursPicker from './components/HoursPicker';

const getRelevantAvailability = (serverTime: number = 0, timeAvailability: TimeAvailability = {}): TimeAvailability => {
  const now = new Date(serverTime);
  const tomorrow = add(set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), { days: 0 });

  const relevantAvailability: TimeAvailability = {};

  if (!timeAvailability) {
    return relevantAvailability;
  }

  for (const [key, value] of Object.entries(timeAvailability).sort(
    (a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime(),
  )) {
    const hour = new Date(value);

    if (isAfter(hour, tomorrow)) {
      relevantAvailability[key] = value;
    }
  }

  return relevantAvailability;
};

const Timetable: React.FC = () => {
  const [timeAvailability, setTimeAvailability] = useState<TimeAvailability>({});
  const { data: user, dispatcher: userDispatcher } = useUser();
  const { data: appointments, dispatcher: appointmentsDispatcher } = useAppointments();

  const [nextWeekDates, setNextWeekDates] = useState<Date[]>([]);
  const [withError, setWithError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userDispatcher.fetchStart();
    appointmentsDispatcher.getServerTimeStart();
  }, [userDispatcher, appointmentsDispatcher]);

  useEffect(() => {
    if (!appointments.serverTime) {
      return;
    }

    const now = new Date(appointments.serverTime);
    const dates: Date[] = [];

    for (let i = 1; i <= 7; i++) {
      const next = set(add(now, { days: i }), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      dates.push(next);
    }

    setNextWeekDates(dates);
  }, [appointments.serverTime]);

  useEffect(() => {
    if (!user.current?.userType) {
      return;
    }
    if (user.current.userType !== UserType.THERAPIST) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (
      !!user.current &&
      user.current.id > 0 &&
      !user.fetching.fetch.isFetching &&
      appointments.serverTime &&
      user.current.userType === UserType.THERAPIST
    ) {
      const relevantAvailability = getRelevantAvailability(
        appointments.serverTime,
        user.current.extraData?.timeAvailability,
      );
      setTimeAvailability(relevantAvailability);
    }
  }, [user, appointments.serverTime]);

  const hoursChanged = useMemo(() => {
    if (
      !user.current ||
      user.fetching.fetch.isFetching ||
      !appointments.serverTime ||
      user.current.userType !== UserType.THERAPIST
    ) {
      return false;
    }

    const relevantAvailability = getRelevantAvailability(
      appointments.serverTime,
      user.current.extraData?.timeAvailability,
    );

    const userEntries = Object.entries(relevantAvailability);
    const entries = Object.entries(timeAvailability);

    if (userEntries.length !== entries.length) {
      return true;
    }

    for (const [key, value] of entries) {
      const userEntry = relevantAvailability[key];

      if (value !== userEntry) {
        return true;
      }
    }

    return false;
  }, [timeAvailability, appointments.serverTime, user]);

  const onSubmitHours = () => {
    userDispatcher.updateTherapistStart({
      key: 'timeAvailability',
      value: timeAvailability,
    });
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Horario'} />
      <View style={styles.headerContainer}>
        <BaseText fontSize={19} weight={700}>
          Próximos 7 días
        </BaseText>
        {hoursChanged && !withError && (
          <TouchableOpacity style={styles.updateButton} onPress={onSubmitHours}>
            <BaseText color={'white'} fontSize={14} weight={500}>
              Actualizar
            </BaseText>
          </TouchableOpacity>
        )}
        {user.fetching.update?.config?.key === 'timeAvailability' && <ActivityIndicator color={GREEN} />}
      </View>
      <Scrollable>
        {(user.fetching.fetch.isFetching &&
          !!user.fetching.fetch.config &&
          Object.keys(user.fetching.fetch.config).length === 0) ||
        !user.current ||
        Object.keys(user.current).length === 0 ? (
          <Loading />
        ) : (
          <HoursPicker
            timeAvailability={timeAvailability}
            dates={nextWeekDates}
            updateTimeAvailability={setTimeAvailability}
            setWithError={setWithError}
          />
        )}
      </Scrollable>
    </MainContainer>
  );
};

export default Timetable;
