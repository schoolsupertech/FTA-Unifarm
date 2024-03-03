import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Color } from "../../constants/colors";

function RatingStar({ size }) {
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(null);

  return (
    <View style={styles.stars}>
      {starRatingOptions.map((option) => (
        <TouchableOpacity key={option} onPress={() => setStarRating(option)}>
          <Ionicons
            name={starRating >= option ? "star-sharp" : "star"}
            size={size}
            style={
              starRating >= option ? styles.starSelected : styles.starUnselected
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default RatingStar;

const styles = StyleSheet.create({
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starSelected: {
    color: Color.star,
  },
  starUnselected: {
    color: "white",
  },
});
