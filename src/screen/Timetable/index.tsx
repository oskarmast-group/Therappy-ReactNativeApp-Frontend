import React, { useEffect, useMemo, useState } from "react";
import TopBar from "../../components/TopBar";
import { BaseText } from "../../components/Text";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { GREEN } from "../../resources/constants/colors";
import Loading from "../../components/Loading";
import styles from "./styles";
import { add, isAfter, set } from "date-fns";
import UserType from "../../interfaces/User/UserType";
import { useNavigate } from "react-router-native";
import TimeAvailability from "../../interfaces/TimeAvailability";
import HoursPicker from "./components/HoursPicker";
import { useAuth } from "../../context/Auth";
import { useAppointment } from "../../context/Appointment";
import { useTherapist } from "../../context/Therapist";
import MainContainer from "../../components/containers/MainContainer";
import Scrollable from "../../components/containers/Scrollable";

const getRelevantAvailability = (
  serverTime: number = 0,
  timeAvailability: TimeAvailability = {}
): TimeAvailability => {
  const now = new Date(serverTime);
  const tomorrow = add(
    set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    { days: 0 }
  );

  const relevantAvailability: TimeAvailability = {};

  if (!timeAvailability) {
    return relevantAvailability;
  }

  for (const [key, value] of Object.entries(timeAvailability).sort(
    (a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime()
  )) {
    const hour = new Date(value);

    if (isAfter(hour, tomorrow)) {
      relevantAvailability[key] = value;
    }
  }

  return relevantAvailability;
};

const Timetable: React.FC = () => {
  const [timeAvailability, setTimeAvailability] = useState<TimeAvailability>(
    {}
  );
  const { user } = useAuth();
  const { getServerTime, loadingStates } = useAppointment();
  const { updateTherapist, loadingUpdate } = useTherapist();
  const [serverTime, setServerTime] = useState<{ now: number } | null>(null);
  const [loadingServerTime, setLoadingServerTime] = useState(true);

  const [nextWeekDates, setNextWeekDates] = useState<Date[]>([]);
  const [withError, setWithError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingServerTime(true);
      const res = await getServerTime();
      if (res) setServerTime(res);
      setLoadingServerTime(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!serverTime) {
      return;
    }

    const now = new Date(serverTime.now);
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
  }, [serverTime]);

  useEffect(() => {
    if (!user?.userType) {
      return;
    }
    if (user.userType !== UserType.THERAPIST) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (
      !!user &&
      user.id > 0 &&
      serverTime &&
      user.userType === UserType.THERAPIST
    ) {
      const relevantAvailability = getRelevantAvailability(
        serverTime.now,
        user.extraData?.timeAvailability
      );
      setTimeAvailability(relevantAvailability);
    }
  }, [user, serverTime]);

  const hoursChanged = useMemo(() => {
    if (!user || !serverTime || user.userType !== UserType.THERAPIST) {
      return false;
    }

    const relevantAvailability = getRelevantAvailability(
      serverTime.now,
      user.extraData?.timeAvailability
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
  }, [timeAvailability, serverTime, user]);

  const onSubmitHours = () => {
    updateTherapist({
      timeAvailability: timeAvailability,
    });
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={"Horario"} />
      <View style={styles.headerContainer}>
        <BaseText fontSize={19} weight={700}>
          Próximos 7 días
        </BaseText>
        {hoursChanged && !withError && (
          <TouchableOpacity style={styles.updateButton} onPress={onSubmitHours}>
            <BaseText color={"white"} fontSize={14} weight={500}>
              Actualizar
            </BaseText>
          </TouchableOpacity>
        )}
        {loadingUpdate && <ActivityIndicator color={GREEN} />}
      </View>
      <Scrollable>
        {!user || Object.keys(user).length === 0 || loadingServerTime ? (
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
