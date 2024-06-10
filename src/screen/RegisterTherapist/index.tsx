import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-native";
import Button, { ButtonText } from "../../components/Button";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { DARK_TEXT } from "../../resources/constants/colors";
import TopBar from "../../components/TopBar";
import { UserTypes } from "../../resources/constants/config";
import { isValidNumber } from "../../utils/phone";
import { useAuth } from "../../context/Auth";
import MainContainer from "../../components/containers/MainContainer";
import Scrollable from "../../components/containers/Scrollable";

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

const RegisterTherapist: React.FC = () => {
  const { registerUser } = useAuth();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const confirmPasswordRef = useRef<TextInput>(null);
  const navigate = useNavigate();

  const submit = () => {
    register();
  };

  const register = async () => {
    try {
      await registerUser({
        email: user,
        password,
        name,
        lastName,
        phone,
        userType: UserTypes.THERAPIST,
        countryOrigin: "MX",
      });
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Error");
    }
  };

  return (
    <MainContainer withBottomDecoration={true} withBottomNavigation={false}>
      <TopBar />
      <Scrollable>
        <Text
          style={{
            textAlign: "center",
            color: DARK_TEXT,
            fontSize: 23,
            fontWeight: 600,
          }}
        >
          Registro para terapeutas
        </Text>
        <Text style={styles.subtitle}>
          Después de crear una cuenta deberás completar tu registro para empezar
          a aceptar pacientes.
        </Text>
        <View style={styles.form}>
          <Input
            labelProps={{ label: "Nombre(s)" }}
            inputProps={{
              required: true,
              type: "text",
              value: name,
              onChangeText: setName,
            }}
          />
          <Input
            labelProps={{ label: "Apellido(s)" }}
            inputProps={{
              required: true,
              type: "text",
              value: lastName,
              onChangeText: setLastName,
            }}
          />
          <Input
            labelProps={{ label: "Correo electrónico" }}
            inputProps={{
              required: true,
              type: "email",
              value: user,
              autoComplete: "off",
              onChangeText: setUser,
            }}
          />
          <Input
            labelProps={{ label: "Teléfono" }}
            inputProps={{
              required: true,
              type: "text",
              value: phone,
              onChangeText: setPhone,
            }}
          />
          {!!phone && !isValidNumber("52", phone) && (
            <Text style={styles.errorText}>Teléfono invalido</Text>
          )}
          <Input
            labelProps={{ label: "Contraseña" }}
            inputProps={{
              required: true,
              type: "password",
              value: password,
              secureTextEntry: true,
              onChangeText: setPassword,
            }}
          />
          <Input
            labelProps={{ label: "Confirmar contraseña" }}
            inputProps={{
              ref: confirmPasswordRef,
              required: true,
              type: "password",
              value: confirmPassword,
              secureTextEntry: true,
              onChangeText: setConfirmPassword,
            }}
          />
          {error && (
            <Text style={styles.errorText}>
              "Error al crear cuenta, verifique sus datos"
            </Text>
          )}
          <Button style={{ marginTop: 30, maxWidth: 200 }} onPress={submit}>
            <ButtonText>Registrarse</ButtonText>
          </Button>
        </View>
      </Scrollable>
    </MainContainer>
  );
};

export const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#d50000",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000", // Replace with DARK_TEXT variable if it's defined
    margin: 0,
    marginTop: 25,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5, // Note: `gap` is not supported in React Native, use margin instead
  },
});

export default RegisterTherapist;
