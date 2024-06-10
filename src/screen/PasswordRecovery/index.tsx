import React, { useRef, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { BaseText, ErrorText } from "../../components/Text";
import Input from "../../components/Input";
import PersonIcon from "../../resources/img/icons/PersonIcon";
import { Link, useNavigate } from "react-router-native";
import Button, { ButtonText } from "../../components/Button";
import TopBar from "../../components/TopBar";
import { useAuth } from "../../context/Auth";
import MainContainer from "../../components/containers/MainContainer";

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

const PasswordRecovery: React.FC = () => {
  const { requestPasswordRecovery } = useAuth();
  const [user, setUser] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    requestRecovery();
  };

  const requestRecovery = async () => {
    try {
      setLoading(true);
      await requestPasswordRecovery({ email: user });
      setText(
        "Correo enviado, siga las instrucciones para continuar con el proceso."
      );
    } catch (error) {
      console.error(error);
      setError(
        "Error al enviar el correo, verifique que el correo sea correcto"
      );
      // You can set the error message to state or show it in some other way
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
            <View style={{ marginVertical: 20, width: "100%" }}>
              <Input
                style={{ marginVertical: 20 }}
                iconProps={{ icon: <PersonIcon /> }}
                inputProps={{
                  required: true,
                  type: "email",
                  value: user,
                  onChangeText: setUser,
                  placeholder: "Correo",
                  disabled: loading,
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                  // onSubmitEditing: submit,
                  blurOnSubmit: false,
                }}
              />
            </View>
            {error && (
              <ErrorText>
                "Error al iniciar sesión, verifique sus datos"
              </ErrorText>
            )}
            <Button disabled={loading} onPress={submit}>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20, // Add margin to simulate gap as needed
  },
  button: {
    marginBottom: 20,
  },
});

export default PasswordRecovery;
