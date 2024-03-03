import React from "react";
import { View, StyleSheet } from "react-native";

function GrayLine() {
  return (
    <View style={{ overflow: "hidden", paddingBottom: 2 }}>
      <View style={styles.grayline} />
    </View>
  );
}

export default GrayLine;

const styles = StyleSheet.create({
  grayline: {
    width: "100%",
    borderBottomColor: "gray", // Set the color you want here
    borderBottomWidth: 1, // Set the thickness of the line here
    marginTop: 8, // Optional: spacing above the line
    marginBottom: 8, // Optional: spacing below the line

    // Shadow bottom
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 5,
  },
});
