import React from "react";
import { View, StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

function Title({ children }) {
  return (
    <View style={styles.container}>
      <PaperText style={styles.title} variant="titleMedium" numberOfLines={2}>
        {children}
      </PaperText>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  title: {
    fontWeight: "bold",
  },
});
