import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-native';
import Login from './src/pages/Login';
import PrivateRoute from './src/containers/PrivateRoute';
import Home from './src/pages/Home';
import Logout from './src/pages/Logout';
import Therapist from './src/pages/Therapist';
import Profile from './src/pages/Profile';
import Conversation from './src/pages/Conversations';
import {Linking, useWindowDimensions} from 'react-native';
import Timetable from './src/pages/Timetable';
import Appointment from './src/pages/Appointment';
import Confirmation from './src/pages/Confirmation';
import Payments from './src/pages/Payments';
import Videocall from './src/pages/Videocall';
import NewPassword from './src/pages/NewPassword';
import PasswordRecovery from './src/pages/PasswordRecovery';
import Register from './src/pages/Register';
import RegisterTherapist from './src/pages/RegisterTherapist';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {onMessageReceived} from './src/utils/notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorManagement from './src/components/ErrorManagement';
import useAppointments from './src/state/appointments';
import useCategories from './src/state/categories';
import useConversations from './src/state/conversations';
import useMessages from './src/state/messages';
import useRequiredDocumentation from './src/state/requiredDocumentation';
import useTherapist from './src/state/therapists';
import useUser from './src/state/user';

function App(): JSX.Element {
  const {height} = useWindowDimensions();
  const navigate = useNavigate();
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const {data: categories, dispatcher: categoriesDispatcher} = useCategories();
  const {data: conversations, dispatcher: conversationsDispatcher} =
    useConversations();
  const {data: messages, dispatcher: messagesDispatcher} = useMessages();
  const {
    data: requiredDocumentation,
    dispatcher: requiredDocumentationDispatcher,
  } = useRequiredDocumentation();
  const {data: therapist, dispatcher: therapistDispatcher} = useTherapist();
  const {data: user, dispatcher: userDispatcher} = useUser();

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

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('initialUrl', initialUrl);
    };

    getUrlAsync();

    const handleDeepLink = ({url}: {url: string}) => {
      const route = url.replace(/.*?:\/\//g, '');
      const routeParts = route.split('/');
      routeParts.shift();
      const routeName = routeParts.join('/');
      console.log(routeName);

      if (routeName) {
        navigate(routeName);
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    messaging().onMessage(onMessageReceived);

    notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));

    return () => {
      Linking.removeAllListeners('url');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorManagement
        states={{
          appointments: {
            state: appointments.error,
            resetError: appointmentsDispatcher.resetError,
          },
          categories: {
            state: categories.error,
            resetError: categoriesDispatcher.resetError,
          },
          conversations: {
            state: conversations.error,
            resetError: conversationsDispatcher.resetError,
          },
          messages: {
            state: messages.error,
            resetError: messagesDispatcher.resetError,
          },
          requiredDocumentation: {
            state: requiredDocumentation.error,
            resetError: requiredDocumentationDispatcher.resetError,
          },
          therapist: {
            state: therapist.error,
            resetError: therapistDispatcher.resetError,
          },
          user: {
            state: user.error,
            resetError: userDispatcher.resetError,
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/registro-terapeutas" element={<RegisterTherapist />} />
        <Route path="/nueva-contraseña/:token" element={<NewPassword />} />
        <Route path="/nueva-contraseña" element={<Navigate to={'/home'} />} />
        <Route path="/recuperar" element={<PasswordRecovery />} />
        <Route path="/" element={<Navigate to={'/home'} />} />
        <Route path="/home/*" element={<PrivateRoute component={Home} />} />
        <Route
          path="/terapeutas/*"
          element={<PrivateRoute component={Therapist} />}
        />
        <Route
          path="/perfil/*"
          element={<PrivateRoute component={Profile} />}
        />
        <Route
          path="/conversacion/:conversationId"
          element={<PrivateRoute component={Conversation} />}
        />
        <Route
          path="/horario"
          element={<PrivateRoute component={Timetable} />}
        />
        <Route
          path="/cita/*"
          element={<PrivateRoute component={Appointment} />}
        />
        <Route
          path="/videollamada/*"
          element={<PrivateRoute component={Videocall} />}
        />
        <Route path="/pagos" element={<PrivateRoute component={Payments} />} />
        <Route
          path="/confirmacion/:token"
          element={<PrivateRoute component={Confirmation} />}
        />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </SafeAreaProvider>
  );
}

export default App;
