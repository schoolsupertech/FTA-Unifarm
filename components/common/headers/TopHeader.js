import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import LogoTitle from "../../../themes/LogoTitle";
import { Colors } from "../../../constants/colors";

function TopHeader({ onCartIconPress, onNotiIconPress }) {
  return (
    <View style={styles.headerContainer}>
      <LogoTitle />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ marginEnd: 16 }} onPress={onCartIconPress}>
          <Ionicons
            name="cart-outline"
            color={Colors.primaryGreen700}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginEnd: 4 }} onPress={onNotiIconPress}>
          <Ionicons
            name="notifications"
            color={Colors.primaryGreen700}
            size={24}
          />
          <Badge style={{ position: "absolute", top: -6, right: -12, backgroundColor: '#FF2929' }}>3</Badge>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TopHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 8,
    height: 45,
  },
});
