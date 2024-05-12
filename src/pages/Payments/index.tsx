import MainContainer from '../../containers/MainContainer';
import React, { useEffect } from 'react';
import { BaseText } from '../../components/Text';
import useUser from '../../state/user';
import { UserTypes } from '../../resources/constants/config';
import { PRIMARY_GREEN } from '../../resources/constants/colors';
import Clients from './Clients';
import Therapists from './Therapist';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';

const Payments = () => {
  const { data: user, dispatcher: userDispatcher } = useUser();

  useEffect(() => {
    if (!user.current?.id) {
      userDispatcher.fetchStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      {user.fetching.fetch.isFetching ? (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color={PRIMARY_GREEN} size={22} visible />
        </View>
      ) : (
        <>
          {user.current?.userType === UserTypes.CLIENT && <Clients />}
          {user.current?.userType === UserTypes.THERAPIST && <Therapists />}
        </>
      )}
    </MainContainer>
  );
};

export default Payments;
