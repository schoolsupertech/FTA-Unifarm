import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import LogoTitle from "../../../themes/LogoTitle";
import { Colors } from "../../../constants/colors";
import CardBtn from "../button/CardBtn";

function TopHeaderLogin({ onLoginPress }) {
  return (
    <View style={styles.headerContainer}>
      <LogoTitle />
      <CardBtn onPress={onLoginPress}>Đăng nhập</CardBtn>
    </View>
  );
}

export default TopHeaderLogin;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 8,
    height: 45,
  },
});
