import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function GridTileModal({ onPress, label, children }) {
  return (
    <TouchableOpacity style={styles.viewContent} onPress={onPress}>
      <View style={{ marginLeft: 18 }}>
        <Text style={styles.textContent}>{label}</Text>
      </View>
      <View style={styles.viewRightContent}>
        <Text style={[styles.textContent, { color: "grey" }]}>{children}</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
}

export default GridTileModal;

const styles = StyleSheet.create({
  viewContent: {
    padding: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
  },
  viewRightContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    fontSize: 14,
    fontWeight: "500",
  },
});
