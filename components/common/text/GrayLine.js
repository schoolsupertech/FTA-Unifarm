import React from "react";
import { View, StyleSheet } from "react-native";

function GrayLine() {
  return <View style={styles.grayline} />;
}

export default GrayLine;

const styles = StyleSheet.create({
  grayline: {
    borderBottomColor: "gray", // Set the color you want here
    borderBottomWidth: 1, // Set the thickness of the line here
    marginTop: 10, // Optional: spacing above the line
    marginBottom: 10, // Optional: spacing below the line
  },
});
