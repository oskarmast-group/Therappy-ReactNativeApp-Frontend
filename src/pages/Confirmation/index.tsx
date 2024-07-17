import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-native';
import {authAPI} from '../../resources/api';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PRIMARY_GREEN} from '../../resources/constants/colors';
import {BaseText} from '../../components/Text';
import Axios from 'axios';

const Confirmation: React.FC = () => {
  const {token} = useParams();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setText('No se detectó un token valido');
      return;
    }
    confirmEmail(token);
  }, [token]);

  const confirmEmail = async (tokenString: string) => {
    setLoading(true);
    try {
      await authAPI.confirmation({token: tokenString});
      setText('Correo verificado con exito');
    } catch (e) {
      console.log(e);
      if (Axios.isAxiosError(e)) {
        if (e.response) {
          setText(
            e.response.status === 403
              ? 'Código expirado, solicita la verificación de correo de nuevo.'
              : 'No se pudo verificar el correo, intente de nuevo más tarde.',
          );
        } else {
          setText(
            'No se pudo verificar el correo, intente de nuevo más tarde.',
          );
        }
      } else {
        setText('No se pudo verificar el correo, intente de nuevo más tarde.');
      }
    }
    setLoading(false);
  };

  return (
    <MainContainer withBottomNavigation={false} withSideMenu={false}>
      <TopBar />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color={PRIMARY_GREEN} size={22} />
        ) : (
          <BaseText
            marginBottom={25}
            fontSize={21}
            weight={600}
            textAlign={'center'}>
            {text}
          </BaseText>
        )}
        <Link to={'/home'} style={styles.link}>
          <BaseText>Regresar</BaseText>
        </Link>
      </View>
    </MainContainer>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  link: {
    marginTop: 30,
    maxWidth: 200,
    alignSelf: 'center',
  },
});
