import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Badge, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Logos from "../../themes/Logos";
import { Colors } from "../../constants/colors";
import { DefaultTheme } from "../../themes/DefaultTheme";

const LogoImage = Logos();

function TopHeader({ label, userInfo, onNotiIconPress }) {
  return (
    <View style={styles.headerContainer}>
      <LogoImage.Logo imgStyle={styles.img} />
      <PaperText
        variant="headlineSmall"
        style={{
          color: Colors.accentBlue,
          fontWeight: "600",
          fontStyle: "italic",
        }}
      >
        {label}
      </PaperText>
      {userInfo && userInfo?.noti !== 0 ? (
        <TouchableOpacity style={{ marginEnd: 4 }} onPress={onNotiIconPress}>
          <Ionicons name="notifications" color={Colors.accentBlue} size={24} />
          <Badge
            style={{
              position: "absolute",
              top: -6,
              right: -12,
            }}
          >
            {userInfo.noti}
          </Badge>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ marginEnd: 4 }} onPress={onNotiIconPress}>
          <Ionicons
            name="notifications-outline"
            color={Colors.accentBlue}
            size={24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TopHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
    height: 45,
  },
  img: {
    width: 50,
    height: 50,
  },
});
