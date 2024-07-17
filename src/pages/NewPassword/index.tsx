import React, {useMemo, useRef, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-native';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import Button, {ButtonText} from '../../components/Button';
import {BaseText, ErrorText} from '../../components/Text';
import Input from '../../components/Input';
import {authAPI} from '../../resources/api';
import {storage} from '../../localStorage';
import Axios from 'axios';
import {unsubscribeNotifications} from '../../utils/notifications';

const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const NewPassword = () => {
  const {token} = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.focus();
    }
  };

  const arePasswordsValid = useMemo(
    () => password && confirmPassword && password === confirmPassword,
    [password, confirmPassword],
  );

  if (!token || !jwtPattern.test(token)) {
    return <Navigate to="/home" />;
  }

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await authAPI.passwordRecovery({
        token,
        password,
      });
      storage.set('auth', JSON.stringify(res));
      const previousUser = storage.getString('userIdentity');
      if (
        previousUser !== res.identity &&
        process.env.NODE_ENV !== 'development'
      ) {
        await unsubscribeNotifications();
      }
      storage.set('userIdentity', res.identity);
      navigate('/');
    } catch (e) {
      console.error(e);
      if (Axios.isAxiosError(e)) {
        setError(
          e?.response?.data?.message ??
            'Error desconocido, intente de nuevo más tarde',
        );
      } else {
        setError('Error desconocido, intente de nuevo más tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer withBottomNavigation={false} withSideMenu={false}>
      <TopBar title={'Cambiar contraseña'} />
      <View style={styles.form}>
        <BaseText>Ingresa una nueva contraseña</BaseText>
        <View style={styles.separator} />
        <Input
          labelProps={{label: 'Contraseña'}}
          inputProps={{
            ref: passwordRef,
            value: password,
            onChangeText: value => setPassword(value),
            autoCapitalize: 'none',
            secureTextEntry: true,
            blurOnSubmit: false,
            onSubmitEditing: handlePasswordSubmit,
          }}
        />
        <View style={styles.separator} />
        <Input
          labelProps={{label: 'Confirmar contraseña'}}
          inputProps={{
            ref: confirmPasswordRef,
            value: confirmPassword,
            onChangeText: value => setConfirmPassword(value),
            autoCapitalize: 'none',
            secureTextEntry: true,
            onSubmitEditing: onSubmit,
          }}
        />
        <View style={styles.separator} />
        {!arePasswordsValid && password && confirmPassword && (
          <ErrorText>Las contraseñas no coinciden</ErrorText>
        )}
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          marginBottom={20}
          disabled={
            loading || !password || !confirmPassword || !arePasswordsValid
          }
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color={'white'} size={22} />
          ) : (
            <ButtonText>Cambiar contraseña</ButtonText>
          )}
        </Button>
      </View>
    </MainContainer>
  );
};

export default NewPassword;

export const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Add margin to simulate gap as needed
  },
  separator: {
    height: 20,
  },
});
