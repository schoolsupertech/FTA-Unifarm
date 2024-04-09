import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Badge, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import LogoTheme from "../../../themes/LogoTheme";
import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

const LogoImage = LogoTheme();

function TopHeader({ userInfo, onCartIconPress, onNotiIconPress }) {
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
      {userInfo && userInfo.qtyInCart ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginEnd: 16 }} onPress={onCartIconPress}>
            <Ionicons name="cart" color={Colors.primaryGreen700} size={24} />
            <Badge
              style={{
                position: "absolute",
                top: -6,
                right: -12,
              }}
            >
              {userInfo.qtyInCart}
            </Badge>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginEnd: 4 }} onPress={onNotiIconPress}>
            <Ionicons
              name="notifications"
              color={Colors.primaryGreen700}
              size={24}
            />
            <Badge
              style={{
                position: "absolute",
                top: -6,
                right: -12,
              }}
            >
              {userInfo.qtyInCart}
            </Badge>
          </TouchableOpacity>
        </View>
      ) : (
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
              name="notifications-outline"
              color={Colors.primaryGreen700}
              size={24}
            />
          </TouchableOpacity>
        </View>
      )}
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
  img: {
    width: 50,
    height: 50,
  },
});
