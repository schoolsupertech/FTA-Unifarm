import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function CardBtn({ bgStyle, textStyle, onPress, icon, children }) {
  return (
    <TouchableOpacity style={styles.orderLineViewContent} onPress={onPress}>
      <View style={styles.orderInnerViewContent}>
        {icon}
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.textBtn}>{children}</Text>
        </View>
      </View>
      <Ionicons name="arrow-forward-sharp" size={18} color="white" />
    </TouchableOpacity>
  );
}

export default CardBtn;

const styles = StyleSheet.create({
  orderLineViewContent: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: DefaultTheme.btnColor700,
    borderRadius: 8,
  },
  orderInnerViewContent: {
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});
