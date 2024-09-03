import React, {PropsWithChildren, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import styles, {ImageComponent, ImageContainer} from './styles';
import {Link} from 'react-router-native';
import {IMAGES_URL} from '../../resources/constants/urls';
import ProfileIcon from '../../resources/img/icons/ProfileIcon';
import {BaseText} from '../Text';
import {NestedTherapist} from '../../interfaces/User';
import RatingStars from '../RatingStars';
import {BaseTherapist} from '../../interfaces/Therapist';
import {PRIMARY_GREEN} from '../../resources/constants/colors';
import DotMenuIcon from '../../resources/img/icons/DotMenuIcon';

const LinkContainer: React.FC<
  PropsWithChildren<{id: number; shouldRender: boolean}>
> = ({shouldRender = false, id, children}) => {
  return shouldRender ? (
    <Link to={`/terapeutas/${id}`} style={styles.link}>
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
  loading?: boolean;
  first?: boolean;
  options?: {title: string; color?: string; callback: () => void}[];
}> = ({
  therapist,
  clickable = true,
  withBorder = true,
  imageProps,
  loading = false,
  options = [],
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const {id, title, name, lastName, profileImg, reviewAvg, reviewsCount} =
    therapist;
  return (
    <View
      style={
        withBorder
          ? StyleSheet.compose(styles.container, styles.containerBorder)
          : styles.container
      }>
      <LinkContainer id={id} shouldRender={clickable}>
        <ImageContainer
          width={imageProps?.width}
          height={imageProps?.height}
          borderRadius={imageProps?.borderRadius}>
          {profileImg ? (
            <ImageComponent
              width={imageProps?.width}
              height={imageProps?.height}
              source={{uri: `${IMAGES_URL}${profileImg}`}}
            />
          ) : (
            <ProfileIcon />
          )}
        </ImageContainer>
        <View style={styles.informationContainer}>
          <BaseText fontSize={18} marginBottom={5}>{`${
            title ?? ''
          } ${name} ${lastName}`}</BaseText>
          <RatingStars reviewsCount={reviewsCount} reviewAvg={reviewAvg} />
        </View>
      </LinkContainer>
      {loading && <ActivityIndicator color={PRIMARY_GREEN} size={22} />}
      {!loading && options.length > 0 && (
        <TouchableHighlight
          style={styles.dotMenuContainer}
          onPress={() => setShowOptions(!showOptions)}>
          <DotMenuIcon />
        </TouchableHighlight>
      )}
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableHighlight
              key={option.title}
              style={styles.option}
              onPress={() => {
                setShowOptions(false);
                option.callback();
              }}>
              <BaseText color={option.color}>{option.title}</BaseText>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </View>
  );
};

export default TherapistCard;
