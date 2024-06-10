import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import { BaseText } from "./Text";
import { DARKER_TEXT, GREEN } from "../constant/colors";
import { NestedClient } from "../types/User";
import { IMAGES_URL } from "../constant/urls";
import ProfileIcon from "../../assets/images/icons/ProfileIcon";

const LinkContainer: React.FC<
  PropsWithChildren<{ id: number; shouldRender: boolean }>
> = ({ shouldRender = false, id, children }) => {
  return shouldRender ? (
    <Link to={`/terapeutas/${id}`}>
      <View style={styles.linkChildrenContainer}>{children}</View>
    </Link>
  ) : (
    <View style={styles.linkChildrenContainer}>{children}</View>
  );
};

const ClientCard: React.FC<{
  client: NestedClient;
  clickable: boolean;
}> = ({ client, clickable = true }) => {
  const { id, name, lastName, profileImg } = client;
  return (
    <View style={styles.container}>
      <LinkContainer id={id} shouldRender={clickable}>
        <View style={styles.imageContainer}>
          {profileImg ? (
            <Image
              style={styles.image}
              source={{ uri: `${IMAGES_URL}${profileImg}` }}
            />
          ) : (
            <ProfileIcon />
          )}
        </View>
        <View style={styles.informationContainer}>
          <BaseText
            fontSize={18}
            marginBottom={5}
          >{`${name} ${lastName}`}</BaseText>
        </View>
      </LinkContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: GREEN,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 10,
    flexShrink: 1,
  },
  linkChildrenContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    color: DARKER_TEXT,
    width: "100%",
    flexShrink: 1,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: "hidden",
    borderRadius: 12,
  },
  image: {
    width: 48,
    height: 48,
  },
  informationContainer: {
    flexShrink: 1,
    minHeight: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default ClientCard;
