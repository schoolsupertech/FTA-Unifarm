import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Colors } from "../../../constants/colors";

function MainButton({ children, onPress, disabled, styleButton }) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          disabled
            ? [styles.innerContainer, styles.innerContainerDisabled]
            : styles.innerContainer,
          styleButton,
        ]}
      >
        <Text
          style={[
            disabled
              ? [styles.btnText, styles.btnTextDisabled]
              : styles.btnText,
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGreen700,
  },
  innerContainerDisabled: {
    backgroundColor: "gray",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primaryGreen50,
  },
  btnTextDisabled: {
    color: Colors.primaryGreen100,
  },
});
