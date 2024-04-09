import React from "react";
import { View, StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

function Title({ children, icon, color }) {
  return (
    <View style={styles.container}>
      {icon}
      <PaperText
        style={[styles.title, { color: color }]}
        variant="titleMedium"
        numberOfLines={2}
      >
        {children}
      </PaperText>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
  },
});
