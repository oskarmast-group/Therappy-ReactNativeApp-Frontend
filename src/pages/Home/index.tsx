import React, { useEffect, useState } from 'react';
import MainContainer from '../../containers/MainContainer';
import Menu from './components/Menu';
import useUser from '../../state/user';
import { Navigate, Route, Routes } from 'react-router-native';
import Summary from './pages/Summary';
import InfoButton from '../../components/InfoButton';
import { useAlert } from '../../alert';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import BottomNavBar from './components/BottomNavBar';
import useConversations from '../../state/conversations';
import { useSocket } from '../../Socket';
import { SocketMessage } from '../../interfaces/Conversation/Message';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import { BaseText } from '../../components/Text';
import { authAPI } from '../../resources/api';
import { ActivityIndicator, View } from 'react-native';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmationEmailLoading, setConfirmationEmailLoading] = useState(false);
  const { data: user, dispatcher: userDispatcher } = useUser();
  const { dispatcher: conversationsDispatcher } = useConversations();
  const alert = useAlert();
  const socket = useSocket();

  useEffect(() => {
    conversationsDispatcher.fetchStart();
  }, [conversationsDispatcher]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('new message', (payload: SocketMessage) => {
      console.log(payload);
      conversationsDispatcher.addLastMessage(payload);
    });

    return () => {
      socket.off('new message');
    };
  }, [socket, conversationsDispatcher]);

  useEffect(() => {
    userDispatcher.fetchStart();
  }, [userDispatcher]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const showEmailConfirmationAlert = () => {
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: 'Verificación de correo pendiente',
        body: (
          <View>
            <BaseText>Para poder usar la app necesitas verificar tu dirección de correo electrónico.</BaseText>
            <BaseText>
              Revisa tu bandeja de entrada por un correo de Terappy. Si no te llegó te lo podemos volver a enviar.
            </BaseText>
          </View>
        ),
        cancelButtonText: 'Ok',
        confirmButtonText: 'Enviar Correo',
      },
    })
      .then(async () => {
        setConfirmationEmailLoading(true);
        await authAPI.requestEmailConfirmation();
        setConfirmationEmailLoading(false);
      })
      .catch(() => {});
  };

  return (
    <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
      <Menu toggleMenu={toggleMenu} />
      {user.current && !user.current.emailVerified && (
        <InfoButton
          buttonProps={{
            backgroundColor: 'red',
            onPress: showEmailConfirmationAlert,
          }}
          content={
            confirmationEmailLoading ? <ActivityIndicator color={'white'} /> : 'Verificación de correo pendiente'
          }
          textProps={{ fontSize: 16, weight: 700 }}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to={'resumen'} />} />
        <Route path="resumen" element={<Summary />} />
        <Route path="mensajes" element={<Messages />} />
        <Route path="calendario" element={<Calendar />} />
      </Routes>
      <BottomNavBar />
    </MainContainer>
  );
};

export default Home;
