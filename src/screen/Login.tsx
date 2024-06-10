import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import MainContainer from "../components/containers/MainContainer";
import TerappyLogo from "../../assets/images/TerappyLogo";
import PersonIcon from "../../assets/images/icons/PersonIcon";
import Input from "../components/Input";
import { PRIMARY_GREEN } from "../constant/colors";
import { BaseText, ErrorText } from "../components/Text";
import Button, { ButtonText } from "../components/Button";
import { useAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-native";

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const passwordInputRef = useRef<TextInput>(null);
  const navigate = useNavigate();

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
      await loginUser({ email, password });
      // const previousUser = storage.getString('userIdentity');
      // if (previousUser !== res.identity && process.env.NODE_ENV !== 'development') {
      //   // await unsubscribeNotifications();
      // }
      // storage.set('userIdentity', res.identity);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Error");
    }
  };

  const isSmallScreen = () => {
    // Add logic to determine if the screen height is less than or equal to 670px
    return window.innerHeight <= 670;
  };

  return (
    <MainContainer
      withBottomDecoration={true}
      withBottomNavigation={false}
      withSideMenu={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.logoContainer}>
          <TerappyLogo width={150} />
        </View>
        <Text
          style={[
            styles.catchphrase,
            isSmallScreen() && styles.catchphraseSmall,
          ]}
        >
          Ayuda psicológica profesional por videollamada
        </Text>
        <Text style={[styles.title, isSmallScreen() && styles.titleSmall]}>
          Iniciar Sesión
        </Text>
        <View style={styles.formContainer}>
          <Input
            iconProps={{ icon: <PersonIcon /> }}
            inputProps={{
              value: email,
              onChangeText: (value) => setEmail(value),
              keyboardType: "email-address",
              autoCapitalize: "none",
              onSubmitEditing: handleEmailSubmit,
              blurOnSubmit: false,
            }}
            labelProps={{ label: "Usuario" }}
          />
          <Input
            iconProps={{ icon: <PersonIcon /> }}
            inputProps={{
              value: password,
              onChangeText: (value) => setPassword(value),
              autoCapitalize: "none",
              secureTextEntry: true,
              ref: passwordInputRef,
              onSubmitEditing: submit,
            }}
            labelProps={{ label: "Contraseña" }}
          />
          <View style={styles.forgotPasswordContainer}>
            <BaseText>¿Olvidaste tu contraseña?</BaseText>
            <Link to="/recuperar">
              <BaseText color={PRIMARY_GREEN} weight={700}>
                Recupérala
              </BaseText>
            </Link>
          </View>
          {error && (
            <ErrorText>
              "Error al iniciar sesión, verifique sus datos"
            </ErrorText>
          )}
          <Button onPress={submit}>
            <ButtonText>Continuar</ButtonText>
          </Button>
          <View
            style={[styles.forgotPasswordContainer, styles.registerContainer]}
          >
            <BaseText>¿Aún no tienes cuenta?</BaseText>
            <Link to="/registro">
              <BaseText color={PRIMARY_GREEN} weight={700}>
                Regístrate
              </BaseText>
            </Link>
          </View>
          <View
            style={[styles.forgotPasswordContainer, styles.registerContainer]}
          >
            <Link to="/registro-terapeutas">
              <BaseText color={PRIMARY_GREEN} weight={700} fontSize={20}>
                Registro psicoterapeutas
              </BaseText>
            </Link>
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 60,
    paddingBottom: 20,
  },
  catchphrase: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },
  catchphraseSmall: {
    fontSize: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#1e2205",
    marginTop: 11,
    marginBottom: 11,
  },
  titleSmall: {
    fontSize: 21,
    marginBottom: 5,
    marginTop: 5,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  forgotPasswordContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
  },
  registerContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
});

export default Login;
