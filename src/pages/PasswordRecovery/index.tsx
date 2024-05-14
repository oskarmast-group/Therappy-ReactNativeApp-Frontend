import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import MainContainer from '../../containers/MainContainer';
import Scrollable from '../../containers/Scrollable';
import styled from 'styled-components/native';
import TerappyLogo from '../../resources/img/TerappyLogo';
import { BaseText, ErrorText } from '../../components/Text';
import Input from '../../components/Input';
import PersonIcon from '../../resources/img/icons/PersonIcon';
import { Link, useNavigate } from 'react-router-native';
import { PRIMARY_GREEN } from '../../resources/constants/colors';
import Button, { ButtonText } from '../../components/Button';
import { authAPI } from '../../resources/api';
import { storage } from '../../localStorage';
import { DARK_TEXT } from '../../resources/constants/colors';
import TopBar from '../../components/TopBar';
import { sub } from 'date-fns';

interface InputProps {
  iconProps: { icon: React.ReactNode };
  inputProps: {
    required: boolean;
    type: string;
    value: string;
    placeholder: string;
    disabled: boolean;
    onChangeText: (value: string) => void;
  };
}

const Form = styled.View`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  button {
    margin-bottom: 20px;
  }
`;

const PasswordRecovery: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    requestRecovery();
  };

  const requestRecovery = async () => {
    try {
      setLoading(true);
      await authAPI.requestPasswordRecovery({ email: user });
      setText('Correo enviado, siga las instrucciones para continuar con el proceso.');
    } catch (error) {
      console.error(error);
      setError('Error al enviar el correo, verifique que el correo sea correcto');
      // You can set the error message to state or show it in some other way
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer withBottomNavigation={false} withSideMenu={false}>
      <TopBar title="Recuperar contraseña" />
      <Form>
        {text ? (
          <BaseText>{text}</BaseText>
        ) : (
          <>
            <BaseText>
              Escriba el correo con el que se registró y enviaremos información para recuperar su contraseña
            </BaseText>
            <Input
              iconProps={{ icon: <PersonIcon /> }}
              inputProps={{
                required: true,
                type: 'email',
                value: user,
                onChangeText: setUser,
                placeholder: 'Correo',
                disabled: loading,
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                // onSubmitEditing: submit,
                blurOnSubmit: false,
              }}
            />
            {error && <ErrorText>"Error al iniciar sesión, verifique sus datos"</ErrorText>}
            <Button disabled={loading} onPress={submit}>
              {loading ? <ActivityIndicator color="white" size={22} /> : <ButtonText>Enviar</ButtonText>}
            </Button>
          </>
        )}
      </Form>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    marginBottom: 20,
  },
});

export default PasswordRecovery;
