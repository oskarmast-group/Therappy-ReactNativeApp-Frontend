import React from "react";
import { StyleSheet, View } from "react-native";
// import useUser from '../../../../state/user';
import Therapist from "./components/Therapist";
import Client from "./components/Client";
import UserType from "../../../types/User/UserType";
import Scrollable from "../../../components/containers/Scrollable";
import { BaseText } from "../../../components/Text";
import { DARKER_TEXT, DARK_TEXT } from "../../../constant/colors";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/Auth";

const Summary: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      <Scrollable>
        <View style={styles.header}>
          <View style={styles.saluteContainer}>
            <BaseText fontSize={28} weight={600} color={DARKER_TEXT}>
              Hola,{" "}
            </BaseText>
            <BaseText fontSize={28} weight={700}>
              {user?.name ?? ""}
            </BaseText>
          </View>
          <BaseText fontSize={21} weight={600} color={DARK_TEXT}>
            ¿Cómo te encuentras hoy?
          </BaseText>
        </View>
        {user ? (
          <>
            {user.userType === UserType.THERAPIST && <Therapist user={user} />}
            {user.userType === UserType.CLIENT && <Client user={user} />}
          </>
        ) : (
          <Loading />
        )}
      </Scrollable>
    </>
  );
};

export default Summary;

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    minHeight: 0,
  },
  saluteContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
