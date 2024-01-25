import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../../constants/colors";

function MainButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.primaryGreen800,
    padding: 20,
    borderRadius: 10,
    mafginBottom: 30,
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
});
