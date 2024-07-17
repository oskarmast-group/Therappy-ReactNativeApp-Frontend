import React, {useEffect, useState} from 'react';
import Container from './components/Container';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Background from './components/Background';
import styles from './components/styles';
import {BaseText} from '../Text';
import CloseIcon from '../../resources/img/icons/CloseIcon';
import {Link} from 'react-router-native';
import {DARK_TEXT, PRIMARY_GREEN} from '../../resources/constants/colors';
import PersonIcon from '../../resources/img/icons/PersonIcon';
import ChevronRightIcon from '../../resources/img/icons/ChevronRightIcon';
import CalendarIcon from '../../resources/img/icons/CalendarIcon';
import UserType from '../../interfaces/User/UserType';
import useUser from '../../state/user';
import VideoIcon from '../../resources/img/icons/VideoIcon';
import CardIcon from '../../resources/img/icons/CardIcon';
import LogoutIcon from '../../resources/img/icons/LogoutIcon';
import {
  canActivateNotifications,
  subscribeNotificationsIfNotAlready,
} from '../../utils/notifications';
import BellIcon from '../../resources/img/icons/BellIcon';

const SideMenu: React.FC<{menuOpen: boolean; toggleMenu: () => void}> = ({
  menuOpen,
  toggleMenu,
}) => {
  const {data: user} = useUser();
  const [showNotificationSub, setShowNotificationSub] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const checkStatus = async () => {
    const canShow = await canActivateNotifications();
    setShowNotificationSub(canShow);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const onSubscribeNotification = async () => {
    setNotificationLoading(true);
    await subscribeNotificationsIfNotAlready();
    await checkStatus();
    setNotificationLoading(false);
  };

  return (
    <Background open={menuOpen} onPress={toggleMenu}>
      <Container
        open={menuOpen}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={toggleMenu}>
            <CloseIcon color={'#ffffff'} />
          </TouchableOpacity>
          <BaseText fontSize={24} weight={700} color={'#fbfbfd'}>
            Ajustes
          </BaseText>
        </View>
        <View style={styles.navigationSection}>
          <Link to={'/perfil'} underlayColor={'transparent'}>
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <PersonIcon />
              </View>
              <View style={styles.textContainer}>
                <BaseText color={DARK_TEXT} weight={600}>
                  Perfil y Cuenta
                </BaseText>
              </View>
              <View style={styles.arrowIconContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </Link>
          {user.current?.userType === UserType.THERAPIST && (
            <Link to={'/horario'} underlayColor={'transparent'}>
              <View style={styles.linkContent}>
                <View style={styles.iconContainer}>
                  <CalendarIcon />
                </View>
                <View style={styles.textContainer}>
                  <BaseText color={DARK_TEXT} weight={600}>
                    Horario disponible
                  </BaseText>
                </View>
                <View style={styles.arrowIconContainer}>
                  <ChevronRightIcon />
                </View>
              </View>
            </Link>
          )}
          <Link to={'/videollamada/probar'} underlayColor={'transparent'}>
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <VideoIcon />
              </View>
              <View style={styles.textContainer}>
                <BaseText color={DARK_TEXT} weight={600}>
                  Probar audio/video
                </BaseText>
              </View>
              <View style={styles.arrowIconContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </Link>
          <Link to={'/pagos'} underlayColor={'transparent'}>
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <CardIcon />
              </View>
              <View style={styles.textContainer}>
                <BaseText color={DARK_TEXT} weight={600}>
                  Pagos
                </BaseText>
              </View>
              <View style={styles.arrowIconContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </Link>
          {showNotificationSub &&
            (notificationLoading ? (
              <ActivityIndicator color={PRIMARY_GREEN} size={22} />
            ) : (
              <TouchableOpacity
                style={styles.linkContent}
                onPress={onSubscribeNotification}>
                <View style={styles.iconContainer}>
                  <BellIcon />
                </View>
                <View style={styles.textContainer}>
                  <BaseText color={DARK_TEXT} weight={600}>
                    Activar Notificaciones
                  </BaseText>
                </View>
                <View style={styles.arrowIconContainer}>
                  <ChevronRightIcon />
                </View>
              </TouchableOpacity>
            ))}
          <Link to={'/logout'} underlayColor={'transparent'}>
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <LogoutIcon />
              </View>
              <View style={styles.textContainer}>
                <BaseText color={DARK_TEXT} weight={600}>
                  Cerrar Sesión
                </BaseText>
              </View>
              <View style={styles.arrowIconContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </Link>
        </View>
      </Container>
    </Background>
  );
};

export default SideMenu;
