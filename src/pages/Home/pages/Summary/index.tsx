import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Scrollable from '../../../../containers/Scrollable';
import useUser from '../../../../state/user';
import {BaseText} from '../../../../components/Text';
import {DARKER_TEXT, DARK_TEXT} from '../../../../resources/constants/colors';
import Loading from '../../../../components/Loading';
import {UserTypes} from '../../../../resources/constants/config';
import Therapist from './Therapist';
import Client from './Client';

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
          {user.current.userType === UserTypes.THERAPIST && <Therapist />}
          {user.current.userType === UserTypes.CLIENT && <Client />}
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
