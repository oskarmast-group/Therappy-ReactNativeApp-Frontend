import React, { useRef, useState } from "react";
import { CustomLink, ErrorText, Title, BaseText } from "../../components/Text";
import Input from "../../components/Input";
import { DARK_TEXT } from "../../resources/constants/colors";
import Button from "../../components/Button";
import { StyleSheet, TextInput, View } from "react-native";
import { isValidNumber } from "../../utils/phone";
import { authAPI } from "../../resources/api";
import { UserTypes } from "../../resources/constants/config";
import { useNavigate } from "react-router-native";
import { useAuth } from "../../context/Auth";
import MainContainer from "../../components/containers/MainContainer";
import Scrollable from "../../components/containers/Scrollable";
import TopBar from "../../components/TopBar";

const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const nameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);
  const navigate = useNavigate();

  const handleNameSubmit = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const handleLastNameSubmit = () => {
    if (lastNameInputRef.current) {
      lastNameInputRef.current.focus();
    }
  };

  const handleEmailSubmit = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordConfirmInputRef.current) {
      passwordConfirmInputRef.current.focus();
    }
  };

  const handlePasswordConfirmSubmit = () => {
    register();
  };

  const register = async () => {
    try {
      const res = await registerUser({
        email: user,
        password,
        name,
        lastName,
        phone,
        userType: UserTypes.CLIENT,
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
        <Title style={{ textAlign: "center", color: DARK_TEXT }}>
          Regístrate
        </Title>
        <View style={styles.formContainer}>
          <Input
            labelProps={{ label: "Nombre(s)" }}
            inputProps={{
              value: name,
              onChangeText: (value) => setName(value),
              autoCapitalize: "none",
              onSubmitEditing: handleNameSubmit,
              blurOnSubmit: false,
              ref: nameInputRef,
            }}
          />
          <Input
            labelProps={{ label: "Apellido(s)" }}
            inputProps={{
              value: lastName,
              onChangeText: (value) => setLastName(value),
              autoCapitalize: "none",
              onSubmitEditing: handleLastNameSubmit,
              blurOnSubmit: false,
              ref: lastNameInputRef,
            }}
          />
          <Input
            labelProps={{ label: "Correo electrónico" }}
            inputProps={{
              value: user,
              onChangeText: (value) => setUser(value),
              autoCapitalize: "none",
              keyboardType: "email-address",
              onSubmitEditing: handleEmailSubmit,
              blurOnSubmit: false,
              autoComplete: "email",
              ref: emailInputRef,
            }}
          />
          <Input
            labelProps={{ label: "Teléfono" }}
            inputProps={{
              value: phone,
              onChangeText: (value) => setPhone(value),
              keyboardType: "phone-pad",
              onSubmitEditing: handlePhoneSubmit,
              ref: phoneInputRef,
            }}
          />
          {!!phone && !isValidNumber("52", phone) && (
            <ErrorText>Teléfono invalido</ErrorText>
          )}
          <Input
            labelProps={{ label: "Contraseña" }}
            inputProps={{
              value: password,
              onChangeText: (value) => setPassword(value),
              autoComplete: "password",
              onSubmitEditing: handlePasswordSubmit,
              ref: passwordInputRef,
            }}
          />
          <Input
            labelProps={{ label: "Confirmar contraseña" }}
            inputProps={{
              value: confirmPassword,
              onChangeText: (value) => setConfirmPassword(value),
              onSubmitEditing: handlePasswordConfirmSubmit,
              autoComplete: "password",
              ref: passwordConfirmInputRef,
            }}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button style={styles.registerButton} onPress={register}>
            <BaseText color="#fff">Registrarse</BaseText>
          </Button>
        </View>
        <CustomLink to="/registro-terapeutas">
          <BaseText
            fontSize={20}
            weight={800}
            marginTop={20}
            color="#000"
            textAlign="center"
          >
            Soy psicoterapeuta
          </BaseText>
        </CustomLink>
      </Scrollable>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 30,
    maxWidth: 200,
    color: "#ffffff",
  },
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default Register;
