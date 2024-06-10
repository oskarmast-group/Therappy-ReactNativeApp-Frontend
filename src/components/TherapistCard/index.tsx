import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import styles, { ImageComponent, ImageContainer } from "./styles";
import { Link } from "react-router-native";
import { BaseText } from "../Text";
import { NestedTherapist } from "../../types/User";
import { BaseTherapist } from "../../types/Therapist";
import { IMAGES_URL } from "../../constant/urls";
import ProfileIcon from "../../../assets/images/icons/ProfileIcon";
import RatingStars from "../RatingStars";

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

const TherapistCard: React.FC<{
  therapist: NestedTherapist | BaseTherapist;
  clickable: boolean;
  withBorder?: boolean;
  imageProps?: {
    width?: number;
    height?: number;
    borderRadius?: number;
  };
}> = ({ therapist, clickable = true, withBorder = true, imageProps }) => {
  const { id, title, name, lastName, profileImg, reviewAvg, reviewsCount } =
    therapist;
  return (
    <View
      style={
        withBorder
          ? StyleSheet.compose(styles.container, styles.containerBorder)
          : styles.container
      }
    >
      <LinkContainer id={id} shouldRender={clickable}>
        <ImageContainer
          width={imageProps?.width}
          height={imageProps?.height}
          borderRadius={imageProps?.borderRadius}
        >
          {profileImg ? (
            <ImageComponent
              width={imageProps?.width}
              height={imageProps?.height}
              source={{ uri: `${IMAGES_URL}${profileImg}` }}
            />
          ) : (
            <ProfileIcon />
          )}
        </ImageContainer>
        <View style={styles.informationContainer}>
          <BaseText fontSize={18} marginBottom={5} weight={600}>{`${
            title ?? ""
          } ${name} ${lastName}`}</BaseText>
          <RatingStars reviewsCount={reviewsCount} reviewAvg={reviewAvg} />
        </View>
      </LinkContainer>
    </View>
  );
};

export default TherapistCard;
