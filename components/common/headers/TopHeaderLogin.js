import React from "react";
import { View, StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

import LogoTheme from "../../../themes/LogoTheme";
import CardBtn from "../button/CardBtn";
import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

const LogoImage = LogoTheme();

function TopHeaderLogin({ onLoginPress }) {
  return (
    <View style={styles.headerContainer}>
      <View style={DefaultTheme.headerLogo}>
        <LogoImage.Logo imgStyle={styles.img} />
        <PaperText
          variant="headlineMedium"
          style={{
            color: Colors.primaryGreen700,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          FTA
        </PaperText>
      </View>
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
  img: {
    width: 50,
    height: 50,
  },
});
