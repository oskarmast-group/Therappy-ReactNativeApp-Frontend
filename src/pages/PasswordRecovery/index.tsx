import React, {useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Button, {ButtonText} from '../../components/Button';
import {BaseText, ErrorText} from '../../components/Text';
import Input from '../../components/Input';
import PersonIcon from '../../resources/img/icons/PersonIcon';
import {authAPI} from '../../resources/api';

const PasswordRecovery: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await authAPI.requestPasswordRecovery({email: user});
      setText(
        'Correo enviado, siga las instrucciones para continuar con el proceso.',
      );
    } catch (e) {
      console.error(e);
      setError(
        'Error al enviar el correo, verifique que el correo sea correcto',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer withBottomNavigation={false} withSideMenu={false}>
      <TopBar title="Recuperar contraseña" />
      <View style={styles.form}>
        {text ? (
          <BaseText>{text}</BaseText>
        ) : (
          <>
            <BaseText>
              Escriba el correo con el que se registró y enviaremos información
              para recuperar su contraseña
            </BaseText>
            <View style={styles.separator} />
            <View style={styles.inputContainer}>
              <Input
                iconProps={{icon: <PersonIcon />}}
                labelProps={{label: 'Correo'}}
                inputProps={{
                  value: user,
                  onChangeText: setUser,
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  onSubmitEditing: onSubmit,
                  blurOnSubmit: true,
                }}
              />
              <View style={styles.separator} />
            </View>
            {error && (
              <ErrorText>
                "Error al iniciar sesión, verifique sus datos"
              </ErrorText>
            )}
            <Button marginBottom={20} disabled={loading} onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color="white" size={22} />
              ) : (
                <ButtonText>Enviar</ButtonText>
              )}
            </Button>
          </>
        )}
      </View>
    </MainContainer>
  );
};

export const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Add margin to simulate gap as needed
  },
  inputContainer: {
    marginVertical: 20,
    width: '100%',
  },
  separator: {
    height: 20,
  },
});

export default PasswordRecovery;
