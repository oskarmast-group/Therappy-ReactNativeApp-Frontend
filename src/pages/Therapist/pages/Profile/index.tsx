import React, { useEffect } from 'react';
import { BaseText } from '../../../../components/Text';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import { useParams } from 'react-router-native';
import useTherapist from '../../../../state/therapists';
import Scrollable from '../../../../containers/Scrollable';
import TherapistCard from '../../../../components/TherapistCard';
import { PRIMARY_GREEN } from '../../../../resources/constants/colors';
import DateSelection from './components/DateSelection';

const Profile: React.FC = () => {
  const { therapistId } = useParams();

  const { data: therapists, dispatcher: therapistsDispatcher } = useTherapist();

  useEffect(() => {
    if (!therapistId || typeof +therapistId !== 'number') {
      return;
    }
    therapistsDispatcher.fetchProfileStart(+therapistId);
  }, [therapistsDispatcher, therapistId]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar backRoute={'../..'} />
      {!therapists.fetching.isFetching && therapists.current && (
        <Scrollable>
          <TherapistCard
            therapist={therapists.current}
            clickable={false}
            withBorder={false}
            imageProps={{ width: 100, height: 100, borderRadius: 15 }}
          />
          {!!therapists.current.phrase && (
            <BaseText marginTop={10} color={PRIMARY_GREEN} fontSize={14} weight={600} fontStyle={'italic'}>
              {therapists.current.phrase}
            </BaseText>
          )}
          {!!therapists.current.experience && (
            <BaseText fontSize={18} weight={800} marginTop={10} marginBottom={4}>
              Acerca de
            </BaseText>
          )}
          {!!therapists.current.experience && <BaseText>{therapists.current.experience}</BaseText>}
          {!!therapists.current.timeAvailability && (
            <BaseText fontSize={18} weight={800} marginTop={10} marginBottom={4}>
              Calendario
            </BaseText>
          )}
          {!!therapists.current.timeAvailability && !!therapistId && typeof +therapistId === 'number' && (
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
