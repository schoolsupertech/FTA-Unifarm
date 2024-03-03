import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";

import { Color } from "../../constants/colors";

function RatingStar({ disabled, halfStarEnabled, size, ratingStar }) {
  const [starRating, setStarRating] = useState(ratingStar);

  return (
    <View style={styles.stars}>
      <StarRating
        disabled={disabled}
        maxStars={5}
        starSize={size}
        rating={starRating}
        halfStarEnabled={halfStarEnabled}
        fullStarColor={Color.star}
        selectedStar={(rating) => setStarRating(rating)}
      />
    </View>
  );
}

export default RatingStar;

const styles = StyleSheet.create({
  stars: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
  },
  starSelected: {
    color: Color.star,
  },
  starUnselected: {
    color: "white",
  },
});
