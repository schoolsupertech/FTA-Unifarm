import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

function CardBtn({ onPress, children }) {
  return (
    <TouchableOpacity style={styles.orderLineViewContent} onPress={onPress}>
      <View style={styles.orderInnerViewContent}>
        <Ionicons name="pin-outline" size={28} color="black" />
        <View style={{ marginLeft: 8 }}>
          <Text>{children}</Text>
        </View>
      </View>
      <AntDesign name="right" size={24} color="gray" />
    </TouchableOpacity>
  );
}

export default CardBtn;

const styles = StyleSheet.create({
  orderLineViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    padding: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  orderInnerViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
