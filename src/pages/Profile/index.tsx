import React, {useEffect, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import {View} from 'react-native';
import useUser from '../../state/user';
import Loading from '../../components/Loading';
import styles from './styles';
import Input from '../../components/Input';
import UserType from '../../interfaces/User/UserType';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';
import UpdateTherapistFields from '../../interfaces/User/UpdateTherapistFields';
import InputCalendar from '../../components/InputCalendar';
import {dateFormat} from '../../utils/date';
import ProfileUpload from './components/ProfileUpload';

const Profile: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const [userData, setUserData] = useState<UpdateUserFields>({
    name: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    phoneCountryCode: '',
  });
  const [therapistData, setTherapistData] = useState<UpdateTherapistFields>({
    title: '',
    experience: '',
    phrase: '',
  });

  useEffect(() => {
    userDispatcher.fetchStart();
  }, [userDispatcher]);

  useEffect(() => {
    if (user.current) {
      setUserData({
        name: user.current.name,
        lastName: user.current.lastName,
        email: user.current.email,
        dob: user.current.dob ?? '',
        phoneNumber: user.current.phoneNumber ?? '',
        phoneCountryCode: user.current.phoneCountryCode ?? '',
      });

      if (
        user.current.extraData &&
        user.current.userType === UserType.THERAPIST
      ) {
        setTherapistData({
          title: user.current.extraData.title,
          experience: user.current.extraData.experience,
          phrase: user.current.extraData.phrase,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.current]);

  const onChange = (key: keyof UpdateUserFields) => (value: string) => {
    setUserData({...userData, [key]: value});
  };

  const onSubmit = (key: keyof UpdateUserFields) => {
    const newValue = userData[key]?.trim();
    if (user.current && user.current[key] !== newValue && newValue) {
      userDispatcher.updateStart({key, value: newValue});
    }
  };

  const onChangeTherapist =
    (key: keyof UpdateTherapistFields) => (value: string) => {
      setTherapistData({...therapistData, [key]: value});
    };

  const onSubmitTherapist = (key: keyof UpdateTherapistFields) => {
    if (key === 'timeAvailability') {
      return;
    }
    const newValue = therapistData[key]?.trim();
    if (
      user.current &&
      user.current.extraData &&
      user.current.userType === UserType.THERAPIST &&
      newValue &&
      user.current.extraData[key] !== newValue
    ) {
      userDispatcher.updateTherapistStart({key, value: newValue});
    }
  };

  const onChangeDate = (value: Date) => {
    const newValue = dateFormat(value);
    setUserData({...userData, dob: newValue});
    if (user.current && user.current.dob !== newValue) {
      userDispatcher.updateStart({key: 'dob', value: newValue});
    }
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Perfil'} backRoute={'../..'} />
      <Scrollable>
        {user.fetching.fetch.isFetching || !user.current ? (
          <Loading />
        ) : (
          <View style={styles.container}>
            <ProfileUpload />
            <Input
              inputProps={{
                value: userData.name,
                onChangeText: value => onChange('name')(value),
              }}
              labelProps={{label: 'Nombre(s)'}}
              editable={true}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'name'
              }
              onSubmit={() => onSubmit('name')}
            />
            <Input
              inputProps={{
                value: userData.lastName,
                onChangeText: value => onChange('lastName')(value),
              }}
              labelProps={{label: 'Apellido(s)'}}
              editable={true}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'lastName'
              }
              onSubmit={() => onSubmit('lastName')}
            />
            <InputCalendar
              inputProps={{
                value: userData.dob,
              }}
              labelProps={{label: 'Fecha de nacimiento'}}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'dob'
              }
              onSubmit={value => onChangeDate(value)}
            />
            {user.current?.userType === UserType.THERAPIST && (
              <>
                <Input
                  inputProps={{
                    value: therapistData.title,
                    onChangeText: value => onChangeTherapist('title')(value),
                  }}
                  labelProps={{label: 'Título'}}
                  editable={true}
                  loading={
                    user.fetching.update.isFetching &&
                    user.fetching.update.config?.key === 'title'
                  }
                  onSubmit={() => onSubmitTherapist('title')}
                />
                <Input
                  inputProps={{
                    value: therapistData.phrase,
                    onChangeText: value => onChangeTherapist('phrase')(value),
                    numberOfLines: 5,
                    multiline: true,
                    textAlignVertical: 'top',
                  }}
                  labelProps={{label: 'Frase'}}
                  editable={true}
                  loading={
                    user.fetching.update.isFetching &&
                    user.fetching.update.config?.key === 'phrase'
                  }
                  onSubmit={() => onSubmitTherapist('phrase')}
                />
                <Input
                  inputProps={{
                    value: therapistData.experience,
                    onChangeText: value =>
                      onChangeTherapist('experience')(value),
                    numberOfLines: 5,
                    multiline: true,
                    textAlignVertical: 'top',
                  }}
                  labelProps={{label: 'Experiencia'}}
                  editable={true}
                  loading={
                    user.fetching.update.isFetching &&
                    user.fetching.update.config?.key === 'experience'
                  }
                  onSubmit={() => onSubmitTherapist('experience')}
                />
              </>
            )}
          </View>
        )}
      </Scrollable>
    </MainContainer>
  );
};

export default Profile;
