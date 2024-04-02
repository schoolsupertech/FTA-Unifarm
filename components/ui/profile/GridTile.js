import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function GridTile({ onPress, icon, children }) {
  return (
    <TouchableOpacity style={styles.orderLineViewContent} onPress={onPress}>
      <View style={styles.orderInnerViewContent}>
        {icon}
        <View style={{ marginLeft: 18 }}>
          <Text style={styles.textContent}>{children}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );
}

export default GridTile;

const styles = StyleSheet.create({
  orderLineViewContent: {
    padding: 12,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderInnerViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textContent: {
    fontSize: 14,
    fontWeight: "500",
  },
});
