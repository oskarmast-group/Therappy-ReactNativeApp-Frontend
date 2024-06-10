import React, { useEffect } from "react";
import { UserTypes } from "../../resources/constants/config";
import Clients from "./Clients";
import Therapists from "./Therapist";
import { View } from "react-native";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/Auth";
import MainContainer from "../../components/containers/MainContainer";

const Payments: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      {!user ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loading />
        </View>
      ) : (
        <>
          {user.userType === UserTypes.CLIENT && <Clients />}
          {user.userType === UserTypes.THERAPIST && <Therapists />}
        </>
      )}
    </MainContainer>
  );
};

export default Payments;
