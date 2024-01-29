import React from 'react';
import {StyleSheet, View} from 'react-native';
import Scrollable from '../../../../containers/Scrollable';
import useUser from '../../../../state/user';
import {BaseText} from '../../../../components/Text';
import {DARKER_TEXT, DARK_TEXT} from '../../../../resources/constants/colors';
import Loading from '../../../../components/Loading';
import Therapist from './components/Therapist';
import Client from './components/Client';
import UserType from '../../../../interfaces/User/UserType';

const Summary: React.FC = () => {
  const {data: user} = useUser();
  return (
    <Scrollable>
      <View style={styles.header}>
        <View style={styles.saluteContainer}>
          <BaseText fontSize={28} weight={600} color={DARKER_TEXT}>
            Hola,{' '}
          </BaseText>
          <BaseText fontSize={28} weight={700}>
            {user?.current?.name ?? ''}
          </BaseText>
        </View>
        <BaseText fontSize={21} weight={600} color={DARK_TEXT}>
          ¿Cómo te encuentras hoy?
        </BaseText>
      </View>
      {user?.current && !user.fetching.fetch.isFetching ? (
        <>
          {user.current.userType === UserType.THERAPIST && <Therapist />}
          {user.current.userType === UserType.CLIENT && (
            <Client user={user.current} />
          )}
        </>
      ) : (
        <Loading />
      )}
    </Scrollable>
  );
};

export default Summary;

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    minHeight: 0,
  },
  saluteContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
