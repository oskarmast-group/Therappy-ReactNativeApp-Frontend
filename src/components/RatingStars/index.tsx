import React, {useMemo} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {BaseText} from '../Text';
import {DARKER_TEXT} from '../../resources/constants/colors';
import StarEmptyIcon from '../../resources/img/icons/StarEmptyIcon';
import StarIcon from '../../resources/img/icons/StarIcon';
import StarHalfIcon from '../../resources/img/icons/StarHalfIcon';

const getStar = (reviewAvg: number, i: number) => {
  const value = +reviewAvg;
  const halfPoint = i - 1 + 0.499;
  if (value >= i) {
    return <StarIcon />;
  }
  if (value > halfPoint) {
    return <StarHalfIcon />;
  }
  return <StarEmptyIcon />;
};

const getStarsArray = (reviewAvg?: number) => {
  if (!reviewAvg) {
    return [];
  }
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(getStar(reviewAvg, i));
  }
  return stars;
};

const RatingStars: React.FC<{reviewAvg?: number; reviewsCount?: number}> = ({
  reviewAvg,
  reviewsCount,
}) => {
  const stars = useMemo(() => getStarsArray(reviewAvg), [reviewAvg]);
  return (
    <View style={styles.container}>
      {!!reviewAvg && (
        <View style={styles.stars}>{stars.map(icon => icon)}</View>
      )}
      {!!reviewAvg && (
        <BaseText fontSize={12} color={DARKER_TEXT}>
          {reviewAvg}
        </BaseText>
      )}
      {reviewsCount && reviewsCount > 0 ? (
        <BaseText fontSize={12} color={DARKER_TEXT}>
          {reviewsCount} reseñas
        </BaseText>
      ) : (
        <BaseText fontSize={12} color={DARKER_TEXT}>
          Aún no hay reseñas
        </BaseText>
      )}
    </View>
  );
};

export default RatingStars;
