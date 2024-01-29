import React, {useEffect, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import Menu from './components/Menu';
import useUser from '../../state/user';
import {Navigate, Route, Routes} from 'react-router-native';
import Summary from './pages/Summary';
import InfoButton from '../../components/InfoButton';
import {useAlert} from '../../alert';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {data: user, dispatcher: userDispatcher} = useUser();
  const alert = useAlert();

  useEffect(() => {
    userDispatcher.fetchStart();
  }, [userDispatcher]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const showEmailConfirmationAlert = () => {
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
        <Route path="/" element={<Navigate to={'/resumen'} />} />
        <Route path="/resumen" element={<Summary />} />
      </Routes>
    </MainContainer>
  );
};

export default Home;
