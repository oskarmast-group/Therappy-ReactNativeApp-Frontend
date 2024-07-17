import React, {useEffect, useMemo} from 'react';
import {BaseText} from '../../../../components/Text';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import {useNavigate, useParams} from 'react-router-native';
import useTherapist from '../../../../state/therapists';
import Scrollable from '../../../../containers/Scrollable';
import TherapistCard from '../../../../components/TherapistCard';
import {PRIMARY_GREEN} from '../../../../resources/constants/colors';
import DateSelection from './components/DateSelection';
import useAppointments from '../../../../state/appointments';
import AppointmentStatus from '../../../../interfaces/Appointment/AppointmentStatus';

const Profile: React.FC = () => {
  const {therapistId} = useParams();
  const {data: therapists, dispatcher: therapistsDispatcher} = useTherapist();
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const navigate = useNavigate();

  useEffect(() => {
    appointmentsDispatcher.fetchUpcomingStart();
  }, [appointmentsDispatcher]);

  const upcomingAppointments = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({status}) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED,
      ),
    [appointments],
  );

  useEffect(() => {
    if (upcomingAppointments.length > 0) {
      navigate(-1);
      return;
    }
  }, [upcomingAppointments, navigate]);

  useEffect(() => {
    if (!therapistId || typeof +therapistId !== 'number') {
      return;
    }
    therapistsDispatcher.fetchProfileStart(+therapistId);
  }, [therapistsDispatcher, therapistId]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar />
      {!therapists.fetching.isFetching && therapists.current && (
        <Scrollable>
          <TherapistCard
            therapist={therapists.current}
            clickable={false}
            withBorder={false}
            imageProps={{width: 100, height: 100, borderRadius: 15}}
          />
          {!!therapists.current.phrase && (
            <BaseText
              marginTop={10}
              color={PRIMARY_GREEN}
              fontSize={14}
              weight={600}
              fontStyle={'italic'}>
              {therapists.current.phrase}
            </BaseText>
          )}
          {!!therapists.current.experience && (
            <BaseText
              fontSize={18}
              weight={800}
              marginTop={10}
              marginBottom={4}>
              Acerca de
            </BaseText>
          )}
          {!!therapists.current.experience && (
            <BaseText>{therapists.current.experience}</BaseText>
          )}
          {!!therapists.current.timeAvailability && (
            <BaseText
              fontSize={18}
              weight={800}
              marginTop={10}
              marginBottom={4}>
              Calendario
            </BaseText>
          )}
          {!!therapists.current.timeAvailability &&
            !!therapistId &&
            typeof +therapistId === 'number' && (
              <DateSelection
                therapistId={+therapistId}
                timeAvailability={therapists.current.timeAvailability}
                appointments={therapists.current.appointments}
              />
            )}
        </Scrollable>
      )}
    </MainContainer>
  );
};

export default Profile;
