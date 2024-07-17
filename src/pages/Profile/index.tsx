import React, {useEffect, useMemo, useRef, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import {ActivityIndicator, TextInput, View} from 'react-native';
import useUser from '../../state/user';
import Loading from '../../components/Loading';
import styles from './styles';
import Input, {IconPositions} from '../../components/Input';
import UserType from '../../interfaces/User/UserType';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';
import UpdateTherapistFields from '../../interfaces/User/UpdateTherapistFields';
import InputCalendar from '../../components/InputCalendar';
import {dateFormat} from '../../utils/date';
import ProfileUpload from './components/ProfileUpload';
import LockIcon from '../../resources/img/icons/LockIcon';
import {BaseText, ErrorText} from '../../components/Text';
import Button, {ButtonText} from '../../components/Button';
import {storage} from '../../localStorage';
import {authAPI} from '../../resources/api';
import Axios from 'axios';
import {useAlert} from '../../alert';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import {RED} from '../../resources/constants/colors';
import {useNavigate} from 'react-router-native';

interface UpdatePasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

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
  const [changePasswordData, setChangePasswordData] =
    useState<UpdatePasswordFields>({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  const [changePasswordError, setChangePasswordError] = useState<string>('');
  const [changePasswordLoading, setChangePasswordLoading] =
    useState<boolean>(false);
  const currentPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmNewPasswordInputRef = useRef<TextInput>(null);
  const alert = useAlert();
  const navigate = useNavigate();

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

  const onChangePassword =
    (key: keyof UpdatePasswordFields) => (value: string) => {
      setChangePasswordData({...changePasswordData, [key]: value});
      setChangePasswordError('');
    };

  const handleCurrentPasswordSubmit = () => {
    if (newPasswordInputRef.current) {
      newPasswordInputRef.current.focus();
    }
  };

  const handleNewPasswordSubmit = () => {
    if (confirmNewPasswordInputRef.current) {
      confirmNewPasswordInputRef.current.focus();
    }
  };

  const onSubmitPasswordChange = async () => {
    setChangePasswordLoading(true);
    const {currentPassword, newPassword} = changePasswordData;
    try {
      const res = await authAPI.changePassword({
        password: currentPassword,
        newPassword,
      });
      storage.set('auth', JSON.stringify(res));
      storage.set('userIdentity', res.identity);
      if (currentPasswordInputRef.current) {
        currentPasswordInputRef.current.blur();
      }
      if (newPasswordInputRef.current) {
        newPasswordInputRef.current.blur();
      }
      if (confirmNewPasswordInputRef.current) {
        confirmNewPasswordInputRef.current.blur();
      }
      setChangePasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      alert({
        type: ALERT_TYPES.INFO,
        config: {
          body: <BaseText>Contraseña actualizada con éxito</BaseText>,
          buttonText: 'OK',
        },
      }).then(() => {});
    } catch (e) {
      console.error(e);
      if (Axios.isAxiosError(e)) {
        if (e.response) {
          setChangePasswordError(e.response.data.message);
        } else {
          setChangePasswordError(
            'Error al cambiar contraseña, verifique sus datos',
          );
        }
      } else {
        setChangePasswordError(
          'Error al cambiar contraseña, verifique sus datos',
        );
      }
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const changePasswordButtonDisabled = useMemo(
    () =>
      changePasswordLoading ||
      !changePasswordData.newPassword ||
      !changePasswordData.currentPassword ||
      !changePasswordData.confirmNewPassword ||
      changePasswordData.newPassword !==
        changePasswordData.confirmNewPassword ||
      changePasswordData.newPassword === changePasswordData.currentPassword,
    [changePasswordData, changePasswordLoading],
  );

  const handleDeleteAccount = () => {
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: 'Eliminar Cuenta',
        body: (
          <>
            <BaseText marginBottom={10}>
              ¿Estás seguro de que deseas eliminar tu cuenta?
            </BaseText>
            <BaseText>
              Esta acción no se puede deshacer y eliminarás toda tu información
            </BaseText>
          </>
        ),
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      },
    }).then(async () => {
      try {
        await authAPI.deleteAccount();
        storage.delete('auth');
        navigate('/');
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Perfil y Cuenta'} />
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
            <Input
              inputProps={{
                value: userData.email,
                editable: false,
              }}
              labelProps={{label: 'Correo electrónico'}}
              editable={false}
              disabled={true}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'email'
              }
              iconProps={{
                icon: <LockIcon />,
                position: IconPositions.TRAILING,
              }}
              onSubmit={() => {}}
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
                <View style={styles.divider} />
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
            <View style={styles.divider} />
            <BaseText textAlign="center" weight={600}>
              Cambiar contraseña
            </BaseText>
            <Input
              inputProps={{
                value: changePasswordData.currentPassword,
                onChangeText: value =>
                  onChangePassword('currentPassword')(value),
                autoCapitalize: 'none',
                secureTextEntry: true,
                ref: currentPasswordInputRef,
                onSubmitEditing: handleCurrentPasswordSubmit,
                blurOnSubmit: false,
              }}
              labelProps={{label: 'Contraseña actual'}}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'name'
              }
            />
            <Input
              inputProps={{
                value: changePasswordData.newPassword,
                onChangeText: value => onChangePassword('newPassword')(value),
                autoCapitalize: 'none',
                secureTextEntry: true,
                ref: newPasswordInputRef,
                onSubmitEditing: handleNewPasswordSubmit,
                blurOnSubmit: false,
              }}
              labelProps={{label: 'Nueva contraseña'}}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'name'
              }
            />
            <Input
              inputProps={{
                value: changePasswordData.confirmNewPassword,
                onChangeText: value =>
                  onChangePassword('confirmNewPassword')(value),
                autoCapitalize: 'none',
                secureTextEntry: true,
                ref: confirmNewPasswordInputRef,
                onSubmitEditing: changePasswordButtonDisabled
                  ? () => {}
                  : onSubmitPasswordChange,
                blurOnSubmit: true,
              }}
              labelProps={{label: 'Confirmar nueva contraseña'}}
              loading={
                user.fetching.update.isFetching &&
                user.fetching.update.config?.key === 'name'
              }
            />
            {changePasswordData.currentPassword &&
              changePasswordData.newPassword &&
              changePasswordData.currentPassword ===
                changePasswordData.newPassword && (
                <ErrorText>
                  La nueva contraseña no puede ser igual a la actual
                </ErrorText>
              )}
            {changePasswordData.newPassword &&
              changePasswordData.confirmNewPassword &&
              changePasswordData.newPassword !==
                changePasswordData.confirmNewPassword && (
                <ErrorText>
                  Las contraseñas no coinciden, verifique sus datos
                </ErrorText>
              )}
            {changePasswordError && (
              <ErrorText>{changePasswordError}</ErrorText>
            )}
            <Button
              onPress={onSubmitPasswordChange}
              disabled={changePasswordButtonDisabled}>
              {changePasswordLoading ? (
                <ActivityIndicator color={'white'} size={22} />
              ) : (
                <ButtonText>Actualizar Contraseña</ButtonText>
              )}
            </Button>
            <View style={styles.divider} />
            <Button onPress={handleDeleteAccount} backgroundColor={RED}>
              {changePasswordLoading ? (
                <ActivityIndicator color={'white'} size={22} />
              ) : (
                <ButtonText>Eliminar Cuenta</ButtonText>
              )}
            </Button>
          </View>
        )}
      </Scrollable>
    </MainContainer>
  );
};

export default Profile;
