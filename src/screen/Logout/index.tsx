import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { useAuth } from "../../context/Auth";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate("/");
    };
    handleLogout();
  }, [navigate]);

  return <View />;
};

export default Logout;
