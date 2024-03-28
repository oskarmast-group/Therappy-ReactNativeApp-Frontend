import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-native';
import Login from './src/pages/Login';
import PrivateRoute from './src/containers/PrivateRoute';
import Home from './src/pages/Home';
import Logout from './src/pages/Logout';
import Therapist from './src/pages/Therapist';
import Profile from './src/pages/Profile';
import Conversation from './src/pages/Conversations';
import {useWindowDimensions} from 'react-native';
import useMessages from './src/state/messages';
import Timetable from './src/pages/Timetable';
import Appointment from './src/pages/Appointment';

function App(): JSX.Element {
  const {height} = useWindowDimensions();
  const {dispatcher: messagesDispatcher} = useMessages();

  useEffect(() => {
    if (height) {
      const decorationHeight = 38;
      const headerHeight = 56;
      const inputBoxHeight = 68;
      const minMessageHeight = 44;

      const spaceForMessages =
        height - decorationHeight - headerHeight - inputBoxHeight;
      if (spaceForMessages > 0) {
        const messagesThatRender = spaceForMessages / minMessageHeight;
        messagesDispatcher.setExtraMessagesToFetch(
          Math.ceil(messagesThatRender) + 1,
        );
      }
    }
  }, [height, messagesDispatcher]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home/*" element={<PrivateRoute component={Home} />} />
      <Route
        path="/terapeutas/*"
        element={<PrivateRoute component={Therapist} />}
      />
      <Route path="/perfil/*" element={<PrivateRoute component={Profile} />} />
      <Route
        path="/conversacion/:conversationId"
        element={<PrivateRoute component={Conversation} />}
      />
      <Route path="/horario" element={<PrivateRoute component={Timetable} />} />
      <Route
        path="/appointment/*"
        element={<PrivateRoute component={Appointment} />}
      />
    </Routes>
  );
}

export default App;
