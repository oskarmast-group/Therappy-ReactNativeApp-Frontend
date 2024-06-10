import React, { useMemo } from "react";
import { View } from "react-native";
import styles from "./styles";
import { BaseText } from "../Text";
import StarIcon from "../../../assets/images/icons/StarIcon";
import StarHalfIcon from "../../../assets/images/icons/StarHalfIcon";
import StarEmptyIcon from "../../../assets/images/icons/StarEmptyIcon";
import { DARKER_TEXT } from "../../constant/colors";

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

const getStarsArray = (reviewAvg?: number | null) => {
  if (!reviewAvg) {
    return [];
  }
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(getStar(reviewAvg, i));
  }
  return stars;
};

const RatingStars: React.FC<{
  reviewAvg?: number | null;
  reviewsCount?: number;
}> = ({ reviewAvg, reviewsCount }) => {
  const stars = useMemo(() => getStarsArray(reviewAvg), [reviewAvg]);
  return (
    <View style={styles.container}>
      {!!reviewAvg && (
        <View style={styles.stars}>{stars.map((icon) => icon)}</View>
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
