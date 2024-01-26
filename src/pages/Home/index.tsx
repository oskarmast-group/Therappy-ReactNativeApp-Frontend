import React, {useEffect, useState} from 'react';
import MainContainer from '../../containers/MainContainer';
import Menu from './components/Menu';
import useUser from '../../state/user';
import {Navigate, Route, Routes} from 'react-router-native';
import Summary from './pages/Summary';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {data: user, dispatcher: userDispatcher} = useUser();

  useEffect(() => {
    userDispatcher.fetchStart();
  }, [userDispatcher]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
      <Menu toggleMenu={toggleMenu} />
      {/* {user.current && !user.current.emailVerified && (
        <InfoButton
          style={{backgroundColor: 'red', fontWeight: '700'}}
          body={'Verificación de correo pendiente'}
          onClick={showEmailConfirmationAlert}
        />
      )} */}
      <Routes>
        <Route path="/" element={<Navigate to={'/resumen'} />} />
        <Route path="/resumen" element={<Summary />} />
      </Routes>
    </MainContainer>
  );
};

export default Home;
