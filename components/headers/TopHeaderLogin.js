import React from "react";
import { View, StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

import Logos from "../../themes/Logos";
import { ButtonFlex } from "../Buttons";
import { Colors } from "../../constants/colors";
import { DefaultTheme } from "../../themes/DefaultTheme";

const LogoImage = Logos();

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
      <ButtonFlex
        title="Đăng nhập"
        onPress={onLoginPress}
        stylesButton={DefaultTheme.btnFlex}
        stylesText={{ fontSize: 16 }}
      />
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
