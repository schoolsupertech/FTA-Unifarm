import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Colors } from "../../constants/colors";

function LoadingIndicator() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primaryGreen700} />
    </SafeAreaView>
  );
}

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justirfyContent: "center",
    backgroundColor: "white",
  },
});
