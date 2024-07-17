import React, {useEffect} from 'react';
// import Clients from './Clients';
import {StyleSheet, View} from 'react-native';
import Loading from '../../components/Loading';
import useUser from '../../state/user';
import MainContainer from '../../containers/MainContainer';
import UserType from '../../interfaces/User/UserType';
import Therapists from './Therapist';
import Client from './Client';

const Payments: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();

  useEffect(() => {
    if (!user.current?.id) {
      userDispatcher.fetchStart();
    }
  }, [user, userDispatcher]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      {user.fetching.fetch.isFetching ? (
        <View style={styles.container}>
          <Loading />
        </View>
      ) : (
        <>
          {user.current?.userType === UserType.CLIENT && <Client />}
          {user.current?.userType === UserType.THERAPIST && <Therapists />}
        </>
      )}
    </MainContainer>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
