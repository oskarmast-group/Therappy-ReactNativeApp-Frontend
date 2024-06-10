import React, { PropsWithChildren } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import { GREEN } from "../../constant/colors";
import TopWave from "../../../assets/images/shapes/TopWave";
import BottomWave from "../../../assets/images/shapes/BottomWave";
import SideMenu from "../SideMenu";

const MainContainer: React.FC<
  PropsWithChildren<{
    withBottomNavigation?: boolean;
    withTopDecoration?: boolean;
    withBottomDecoration?: boolean;
    withSideMenu?: boolean;
    menuOpen?: boolean;
    toggleMenu?: () => void;
  }>
> = ({
  children,
  withBottomNavigation = true,
  withTopDecoration = true,
  withBottomDecoration = false,
  withSideMenu = true,
  menuOpen = false,
  toggleMenu = () => {},
}) => {
  const iosStatusHeight =
    Platform.OS === "ios" ? { height: StatusBar.currentHeight } : {};

  return (
    <>
      {Platform.OS === "ios" ? (
        <View style={[styles.iosStatus, iosStatusHeight]} />
      ) : (
        <StatusBar barStyle={"light-content"} backgroundColor={GREEN} />
      )}
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.content} pointerEvents="box-none">
          {withTopDecoration && (
            <View style={styles.topDecoration}>
              <TopWave />
            </View>
          )}
          <View
            style={[
              styles.main,
              !withBottomNavigation
                ? styles.mainFullscreen
                : styles.mainWithNavigation,
            ]}
          >
            {children}
          </View>
          {withBottomDecoration && (
            <View style={styles.bottomDecoration}>
              <BottomWave />
            </View>
          )}
          {withSideMenu && (
            <SideMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fbfbfd",
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
  },
  main: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  mainFullscreen: {
    marginBottom: 0,
  },
  mainWithNavigation: {
    // marginBottom: 58,
  },
  topDecoration: {
    height: 38,
    width: "100%",
  },
  bottomDecoration: {
    height: 68,
    width: "100%",
  },
  iosStatus: {
    backgroundColor: GREEN,
    width: "100%",
  },
});

export default MainContainer;
