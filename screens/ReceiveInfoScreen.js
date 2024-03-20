import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ReceiveInfoScreen() {
  return (
    <View style={styles.container}>
      <Text>This is receive information screen</Text>
    </View>
  );
}

export default ReceiveInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
