import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import styles from "./styles";
import { Link } from "react-router-native";
import { BaseAppointment } from "../../../../../../../types/Appointment";
import { useAppointment } from "../../../../../../../context/Appointment";
import { IMAGES_URL } from "../../../../../../../constant/urls";
import ProfileIcon from "../../../../../../../../assets/images/icons/ProfileIcon";
import { BaseText } from "../../../../../../../components/Text";
import { getDisplayDate } from "../../../../../../../utils/date";
import Button, { ButtonText } from "../../../../../../../components/Button";

const AppointmentCard: React.FC<{ app: BaseAppointment }> = ({ app }) => {
  const { acceptAppointment, loadingStates } = useAppointment();

  const onAccept = async (id: number) => {
    await acceptAppointment({ appointmentId: id });
    //subscribeNotificationsIfNotAlready();
  };

  return (
    <View style={styles.container}>
      <Link to={`/appointment/${app.roomId}`}>
        <View style={styles.linkChildrenContainer}>
          <View style={styles.imageContainer}>
            {app.profileImg ? (
              <Image
                style={styles.image}
                source={{ uri: `${IMAGES_URL}${app.profileImg}` }}
              />
            ) : (
              <ProfileIcon />
            )}
          </View>
          <View style={styles.informationContainer}>
            <BaseText fontSize={20} marginBottom={2} weight={700}>{`${
              app.title ? `${app.title} ` : ""
            }${app.name} ${app.lastName}`}</BaseText>
            <BaseText>
              {getDisplayDate(app.date, "EEEE - MMMM d, yyyy")}
            </BaseText>
          </View>
        </View>
      </Link>
      <Button
        paddingTop={5}
        paddingBottom={5}
        width={"50%"}
        flex={1}
        onPress={() => onAccept(app.id)}
        disabled={loadingStates.acceptAppointment}
      >
        {loadingStates.acceptAppointment ? (
          <ActivityIndicator color={"#fbfbfd"} />
        ) : (
          <ButtonText>Aceptar</ButtonText>
        )}
      </Button>
    </View>
  );
};

export default AppointmentCard;
