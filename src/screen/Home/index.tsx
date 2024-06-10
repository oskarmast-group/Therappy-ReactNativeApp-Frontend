import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeNavigationProp } from "../../types/notification";
import MainContainer from "../../components/containers/MainContainer";
import Menu from "../../components/Menu";
import { useAuth } from "../../context/Auth";
import InfoButton from "../../components/InfoButton";
import BottomNavBar from "../../components/home/BottomNavBar";
import { Navigate, Route, Routes } from "react-router-native";
import { useSocket } from "../../Socket";
import { useConversation } from "../../context/Conversations";
import ALERT_TYPES from "../../alert/interfaces/AlertTypes";
import { BaseText } from "../../components/Text";
import Summary from "./Summary";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";

const Home: React.FC = () => {
  const { user, loading, requestEmailConfirmation } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const socket = useSocket();
  const { getAllConversations } = useConversation();
  const [confirmationEmailLoading, setConfirmationEmailLoading] =
    useState(false);

  useEffect(() => {
    getAllConversations();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const showEmailConfirmationAlert = () => {
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: "Verificación de correo pendiente",
        body: (
          <View>
            <BaseText>
              Para poder usar la app necesitas verificar tu dirección de correo
              electrónico.
            </BaseText>
            <BaseText>
              Revisa tu bandeja de entrada por un correo de Terappy. Si no te
              llegó te lo podemos volver a enviar.
            </BaseText>
          </View>
        ),
        cancelButtonText: "Ok",
        confirmButtonText: "Enviar Correo",
      },
    })
      .then(async () => {
        setConfirmationEmailLoading(true);
        await requestEmailConfirmation();
        setConfirmationEmailLoading(false);
      })
      .catch(() => {});
  };

  return (
    <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
      <Menu toggleMenu={toggleMenu} />
      {user && !user.emailVerified && (
        <InfoButton
          buttonProps={{
            backgroundColor: "red",
            onPress: showEmailConfirmationAlert,
          }}
          content={
            confirmationEmailLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              "Verificación de correo pendiente"
            )
          }
          textProps={{ fontSize: 16, fontWeight: "700" }}
        />
      )}

      <Routes>
        <Route path="/" element={<Navigate to={"resumen"} />} />
        <Route path="resumen" element={<Summary />} />
        <Route path="mensajes" element={<Messages />} />
        <Route path="calendario" element={<Calendar />} />
      </Routes>
      <BottomNavBar />
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
