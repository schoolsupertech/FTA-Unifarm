import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function GridTile({ onPress, icon, children }) {
  return (
    <TouchableOpacity style={styles.orderLineViewContent} onPress={onPress}>
      <View style={styles.orderInnerViewContent}>
        {icon}
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.textOrder}>{children}</Text>
        </View>
      </View>
      <AntDesign name="right" size={24} color="gray" />
    </TouchableOpacity>
  );
}

export default GridTile;

const styles = StyleSheet.create({
  orderLineViewContent: {
    width: "100%",
    paddingBottom: 8,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  orderInnerViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textOrder: {
    fontSize: 14,
    fontWeight: "500",
  },
});
