import React from "react";
import { Image, TouchableHighlight, View, StyleSheet } from "react-native";
import { useAuth } from "../context/Auth";
import MenuIcon from "../../assets/images/icons/MenuIcon";
import ProfileIcon from "../../assets/images/icons/ProfileIcon";
import { GREEN } from "../constant/colors";
import { IMAGES_URL } from "../resources/constants/urls";

const Menu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.menuButton} onPress={toggleMenu}>
        <MenuIcon />
      </TouchableHighlight>
      <View style={styles.profileContainer}>
        {user?.profileImg ? (
          <Image source={{ uri: `${IMAGES_URL}${user.profileImg}` }} />
        ) : (
          <ProfileIcon />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    //   '@media (max-height: 670px)': {
    //     height: 36,
    //   },
  },
  profileContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    borderColor: GREEN,
    borderWidth: 2,
    borderStyle: "solid",
    //   '@media (max-height: 670px)': {
    //     height: 36,
    //     width: 36,
    //     borderRadius: 18,
    //   },
  },
  menuButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    padding: 1,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 35,
    height: 25,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default Menu;
