import React, { useRef, useState } from 'react';
import MainContainer from '../../containers/MainContainer';
import Scrollable from '../../containers/Scrollable';
import styled from 'styled-components/native';
import TerappyLogo from '../../resources/img/TerappyLogo';
import StyleSheet from 'react-native-media-query';
import { BaseText } from '../../components/Text';
import Input from '../../components/Input';
import PersonIcon from '../../resources/img/icons/PersonIcon';
import { Link, useNavigate } from 'react-router-native';
import { PRIMARY_GREEN } from '../../resources/constants/colors';
import Button, { ButtonText } from '../../components/Button';
import { authAPI } from '../../resources/api';
import { storage } from '../../localStorage';
import { Text, TextInput } from 'react-native';
import { DARK_TEXT } from '../../resources/constants/colors';
import TopBar from '../../components/TopBar';
import { UserTypes } from '../../resources/constants/config';
import { isValidNumber } from '../../utils/phone';

interface InputProps {
  labelProps: { label: string };
  inputProps: {
    required: boolean;
    type: string;
    value: string;
    secureTextEntry?: boolean;
    autoComplete?: string;
    onChangeText: (value: string) => void;
    ref?: React.RefObject<TextInput>;
  };
}

const ErrorText = styled(BaseText)`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #d50000;
`;

const Subtitle = styled(BaseText)`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${DARK_TEXT};
  margin: 0;
  margin-top: 25px;
`;

const Form = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

const RegisterTherapist: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const confirmPasswordRef = useRef<TextInput>(null);
  const navigate = useNavigate();

  const submit = () => {
    register();
  };

  const register = async () => {
    try {
      const res = await authAPI.register({
        email: user,
        password,
        name,
        lastName,
        phone,
        userType: UserTypes.THERAPIST,
        countryOrigin: 'MX',
      });
      storage.set('auth', JSON.stringify(res));
      navigate('/g');
    } catch (e) {
      console.error(e);
      setError('Error');
    }
  };

  return (
    <MainContainer withBottomDecoration={true} withBottomNavigation={false}>
      <TopBar />
      <Scrollable>
        <Text style={{ textAlign: 'center', color: DARK_TEXT, fontSize: 23, fontWeight: 600 }}>
          Registro para terapeutas
        </Text>
        <Subtitle>Después de crear una cuenta deberás completar tu registro para empezar a aceptar pacientes.</Subtitle>
        <Form>
          <Input
            labelProps={{ label: 'Nombre(s)' }}
            inputProps={{
              required: true,
              type: 'text',
              value: name,
              onChangeText: setName,
            }}
          />
          <Input
            labelProps={{ label: 'Apellido(s)' }}
            inputProps={{
              required: true,
              type: 'text',
              value: lastName,
              onChangeText: setLastName,
            }}
          />
          <Input
            labelProps={{ label: 'Correo electrónico' }}
            inputProps={{
              required: true,
              type: 'email',
              value: user,
              autoComplete: 'off',
              onChangeText: setUser,
            }}
          />
          <Input
            labelProps={{ label: 'Teléfono' }}
            inputProps={{
              required: true,
              type: 'text',
              value: phone,
              onChangeText: setPhone,
            }}
          />
          {!!phone && !isValidNumber('52', phone) && <ErrorText>Teléfono invalido</ErrorText>}
          <Input
            labelProps={{ label: 'Contraseña' }}
            inputProps={{
              required: true,
              type: 'password',
              value: password,
              secureTextEntry: true,
              onChangeText: setPassword,
            }}
          />
          <Input
            labelProps={{ label: 'Confirmar contraseña' }}
            inputProps={{
              ref: confirmPasswordRef,
              required: true,
              type: 'password',
              value: confirmPassword,
              secureTextEntry: true,
              onChangeText: setConfirmPassword,
            }}
          />
          {error && <ErrorText>"Error al crear cuenta, verifique sus datos"</ErrorText>}
          <Button style={{ marginTop: 30, maxWidth: 200 }} onPress={submit}>
            <ButtonText>Registrarse</ButtonText>
          </Button>
        </Form>
      </Scrollable>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: DARK_TEXT,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default RegisterTherapist;
