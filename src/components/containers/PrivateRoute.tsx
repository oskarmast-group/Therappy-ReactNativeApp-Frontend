import React from "react";
import { Navigate, useLocation } from "react-router-native";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading";
import { View } from "react-native";

interface PrivateRouteInterface {
  groupId?: number;
  access?: string;
  userType?: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteInterface> = ({
  component: Component,
}) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading.loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default PrivateRoute;
