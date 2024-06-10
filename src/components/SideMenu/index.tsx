import React from "react";
import Container from "./components/Container";
import { TouchableOpacity, View } from "react-native";
import Background from "./components/Background";
import styles from "./components/styles";
import { BaseText } from "../Text";
import CloseIcon from "../../resources/img/icons/CloseIcon";
import { Link } from "react-router-native";
import { DARK_TEXT } from "../../resources/constants/colors";
import PersonIcon from "../../resources/img/icons/PersonIcon";
import ChevronRightIcon from "../../resources/img/icons/ChevronRightIcon";
import CalendarIcon from "../../resources/img/icons/CalendarIcon";
import UserType from "../../interfaces/User/UserType";
import VideoIcon from "../../resources/img/icons/VideoIcon";
import CardIcon from "../../resources/img/icons/CardIcon";
import LogoutIcon from "../../resources/img/icons/LogoutIcon";
import { useAuth } from "../../context/Auth";

const SideMenu: React.FC<{ menuOpen: boolean; toggleMenu: () => void }> = ({
  menuOpen,
  toggleMenu,
}) => {
  const { user } = useAuth();
  return (
    <Background open={menuOpen} onPress={toggleMenu}>
      <Container
        open={menuOpen}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      >
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={toggleMenu}
          >
            <CloseIcon color={"#ffffff"} />
          </TouchableOpacity>
          <BaseText fontSize={24} weight={700} color={"#fbfbfd"}>
            Ajustes
          </BaseText>
        </View>
        <View style={styles.navigationSection}>
          <Link to={"/perfil"}>
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <PersonIcon />
              </View>
              <View style={styles.textContainer}>
                <BaseText color={DARK_TEXT} weight={600}>
                  Perfil
                </BaseText>
              </View>
              <View style={styles.arrowIconContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </Link>
          {user?.userType === UserType.THERAPIST && (
            <Link to={"/horario"}>
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
          <Link to={"/videollamada/"}>
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
          <Link to={"/pagos"}>
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
          {/* {showNotificationSub &&
                        (notificationLoading ? (
                            <Ring color={PRIMARY_GREEN} size={22} />
                        ) : (
                            <li>
                                <button type="button" onClick={onSubscribeNotification}>
                                    <img src={BellSVG} alt={'Campana'} />
                                    <p>Activar Notificaciones</p>
                                    <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                                </button>
                            </li>
                        ))} */}
          <Link to={"/logout"}>
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
