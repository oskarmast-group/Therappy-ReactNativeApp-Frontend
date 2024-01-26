import React, {useRef, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import Scrollable from '../../containers/Scrollable';
import styled from 'styled-components/native';
import TerappyLogo from '../../resources/img/TerappyLogo';
import StyleSheet from 'react-native-media-query';
import {BaseText, ErrorText} from '../../components/Text';
import Input from '../../components/Input';
import PersonIcon from '../../resources/img/icons/PersonIcon';
import {Link, useNavigate} from 'react-router-native';
import {PRIMARY_GREEN} from '../../resources/constants/colors';
import Button, {ButtonText} from '../../components/Button';
import {authAPI} from '../../resources/api';
import {storage} from '../../localStorage';
import {TextInput} from 'react-native';

const LogoContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-top: 60px;
`;

const Catchphrase = styled(BaseText)`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;

const Title = styled(BaseText)`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1e2205;
  margin-top: 11px;
  margin-bottom: 11px;
`;

const {styles: responsive} = StyleSheet.create({
  Catchphrase: {
    '@media (max-height: 670px)': {
      fontSize: 12,
    },
  },
  Title: {
    '@media (max-height: 670px)': {
      fontSize: 21,
      marginBottom: 5,
      marginTop: 5,
    },
  },
});

const FormContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ForgotPasswordContainer = styled.View`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: row;
`;

const RegisterContainer = styled(ForgotPasswordContainer)`
  margin-top: 10px;
  margin-bottom: 40px;
`;

const Login: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const passwordInputRef = useRef<TextInput>(null);

  const handleEmailSubmit = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const submit = () => {
    login();
  };

  const login = async () => {
    try {
      const res = await authAPI.login({email: user, password});
      storage.set('auth', JSON.stringify(res));
      const previousUser = storage.getString('userIdentity');
      if (
        previousUser !== res.identity &&
        process.env.NODE_ENV !== 'development'
      ) {
        // await unsubscribeNotifications();
      }
      storage.set('userIdentity', res.identity);
      navigate('/');
    } catch (e) {
      console.error(e);
      setError('Error');
    }
  };

  return (
    <MainContainer
      withBottomDecoration={true}
      withBottomNavigation={false}
      withSideMenu={false}>
      <Scrollable>
        <LogoContainer>
          <TerappyLogo width={150} />
        </LogoContainer>
        <Catchphrase style={responsive.Catchphrase}>
          Ayuda psicológica profesional por videollamada
        </Catchphrase>
        <Title>Iniciar Sesión</Title>
        <FormContainer>
          <Input
            iconProps={{icon: <PersonIcon />}}
            inputProps={{
              value: user,
              onChangeText: value => setUser(value),
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              onSubmitEditing: handleEmailSubmit,
              blurOnSubmit: false,
            }}
            labelProps={{label: 'Usuario'}}
          />
          <Input
            iconProps={{icon: <PersonIcon />}}
            inputProps={{
              value: password,
              onChangeText: value => setPassword(value),
              autoCapitalize: 'none',
              secureTextEntry: true,
              ref: passwordInputRef,
              onSubmitEditing: submit,
            }}
            labelProps={{label: 'Contraseña'}}
          />
          <ForgotPasswordContainer>
            <BaseText>¿Olvidaste tu contraseña?</BaseText>
            <Link to="/recuperar">
              <BaseText color={PRIMARY_GREEN} weight={700}>
                Recupérala
              </BaseText>
            </Link>
          </ForgotPasswordContainer>
          {error && (
            <ErrorText>
              "Error al iniciar sesión, verifique sus datos"
            </ErrorText>
          )}
          <Button onPress={submit}>
            <ButtonText>Continuar</ButtonText>
          </Button>
          <RegisterContainer>
            <BaseText>¿Aún no tienes cuenta?</BaseText>
            <Link to="/registro">
              <BaseText color={PRIMARY_GREEN} weight={700}>
                Regístrate
              </BaseText>
            </Link>
          </RegisterContainer>
          <RegisterContainer>
            <Link to="/registro-terapeutas">
              <BaseText color={PRIMARY_GREEN} weight={700} fontSize={20}>
                Registro psicoterapeutas
              </BaseText>
            </Link>
          </RegisterContainer>
        </FormContainer>
      </Scrollable>
    </MainContainer>
  );
};

export default Login;
