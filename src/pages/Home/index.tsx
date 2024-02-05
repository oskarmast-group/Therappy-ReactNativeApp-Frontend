import React, {useEffect, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import Menu from './components/Menu';
import useUser from '../../state/user';
import {Navigate, Route, Routes} from 'react-router-native';
import Summary from './pages/Summary';
import InfoButton from '../../components/InfoButton';
import {useAlert} from '../../alert';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import BottomNavBar from './components/BottomNavBar';
import useConversations from '../../state/conversations';
import {useSocket} from '../../Socket';
import {SocketMessage} from '../../interfaces/Conversation/Message';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {data: user, dispatcher: userDispatcher} = useUser();
  const {dispatcher: conversationsDispatcher} = useConversations();
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

  //TODO: const showEmailConfirmationAlert = () => {
  //   alert({
  //     type: ALERT_TYPES.CUSTOM,
  //     config: {
  //       body: EmailConfirmationDialog,
  //       props: {
  //         userId: user.current?.id,
  //       },
  //     },
  //   })
  //     .then(() => {})
  //     .catch(() => {});
  // };

  return (
    <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
      <Menu toggleMenu={toggleMenu} />
      {user.current && !user.current.emailVerified && (
        <InfoButton
          buttonProps={{backgroundColor: 'red', onPress: () => {}}}
          text={'Verificación de correo pendiente'}
          textProps={{fontSize: 16, weight: 700}}
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
