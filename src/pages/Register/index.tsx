import React, {useMemo, useRef, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import {BaseText, ErrorText, Title} from '../../components/Text';
import Scrollable from '../../containers/Scrollable';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import Input from '../../components/Input';
import Button, {ButtonText} from '../../components/Button';
import {Link, useNavigate} from 'react-router-native';
import {authAPI} from '../../resources/api';
import UserType from '../../interfaces/User/UserType';
import {storage} from '../../localStorage';
import {PRIMARY_GREEN} from '../../resources/constants/colors';
import {isValidNumber} from '../../utils/phone';
import {unsubscribeNotifications} from '../../utils/notifications';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const nameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNameSubmit = () => {
    if (lastNameInputRef.current) {
      lastNameInputRef.current.focus();
    }
  };

  const handleLastNameSubmit = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleEmailSubmit = () => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  };

  const handlePhoneSubmit = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordConfirmInputRef.current) {
      passwordConfirmInputRef.current.focus();
    }
  };

  const arePasswordsValid = useMemo(
    () => password && confirmPassword && password === confirmPassword,
    [password, confirmPassword],
  );

  const handlePasswordConfirmSubmit = () => {
    register();
  };

  const register = async () => {
    setLoading(true);
    try {
      const res = await authAPI.register({
        email: user,
        password,
        name,
        lastName,
        phone,
        userType: UserType.CLIENT,
        countryOrigin: 'MX',
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
      setError('Error');
      setLoading(false);
    }
  };

  return (
    <MainContainer withBottomDecoration={true} withBottomNavigation={false}>
      <TopBar />
      <Scrollable>
        <Title style={styles.title}>Regístrate</Title>
        <View style={styles.formContainer}>
          <Input
            labelProps={{label: 'Nombre(s)'}}
            inputProps={{
              value: name,
              onChangeText: value => setName(value),
              autoCapitalize: 'words',
              onSubmitEditing: handleNameSubmit,
              blurOnSubmit: false,
              ref: nameInputRef,
            }}
          />
          <Input
            labelProps={{label: 'Apellido(s)'}}
            inputProps={{
              value: lastName,
              onChangeText: value => setLastName(value),
              autoCapitalize: 'words',
              onSubmitEditing: handleLastNameSubmit,
              blurOnSubmit: false,
              ref: lastNameInputRef,
            }}
          />
          <Input
            labelProps={{label: 'Correo electrónico'}}
            inputProps={{
              value: user,
              onChangeText: value => setUser(value),
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              onSubmitEditing: handleEmailSubmit,
              blurOnSubmit: false,
              autoComplete: 'email',
              ref: emailInputRef,
            }}
          />
          <Input
            labelProps={{label: 'Teléfono'}}
            inputProps={{
              value: phone,
              onChangeText: value => setPhone(value),
              keyboardType: 'phone-pad',
              onSubmitEditing: handlePhoneSubmit,
              ref: phoneInputRef,
            }}
          />
          {!!phone && !isValidNumber('52', phone) && (
            <ErrorText>Teléfono invalido</ErrorText>
          )}
          <Input
            labelProps={{label: 'Contraseña'}}
            inputProps={{
              value: password,
              onChangeText: value => setPassword(value),
              autoCapitalize: 'none',
              secureTextEntry: true,
              onSubmitEditing: handlePasswordSubmit,
              ref: passwordInputRef,
            }}
          />
          <Input
            labelProps={{label: 'Confirmar contraseña'}}
            inputProps={{
              value: confirmPassword,
              onChangeText: value => setConfirmPassword(value),
              onSubmitEditing: handlePasswordConfirmSubmit,
              autoCapitalize: 'none',
              secureTextEntry: true,
              ref: passwordConfirmInputRef,
            }}
          />
          {!arePasswordsValid && password && confirmPassword && (
            <ErrorText>Las contraseñas no coinciden</ErrorText>
          )}
          {error && <ErrorText>{error}</ErrorText>}
          <Button
            style={styles.registerButton}
            onPress={register}
            disabled={
              loading || !password || !confirmPassword || !arePasswordsValid
            }>
            {loading ? (
              <ActivityIndicator color={'white'} size={22} />
            ) : (
              <ButtonText color="#fff">Registrarse</ButtonText>
            )}
          </Button>
        </View>
        <Link
          to="/registro-terapeutas"
          disabled={loading}
          underlayColor={'transparent'}>
          <BaseText
            fontSize={20}
            weight={800}
            marginTop={20}
            color={loading ? '#cccccc' : PRIMARY_GREEN}
            textAlign="center">
            Soy psicoterapeuta
          </BaseText>
        </Link>
      </Scrollable>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 30,
    maxWidth: 200,
    color: '#ffffff',
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default Register;
