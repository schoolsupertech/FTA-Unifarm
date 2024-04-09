import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { DefaultTheme } from "../../themes/DefaultTheme";

function HeaderContent({ children, label, icon, onPress }) {
  return (
    <View style={styles.container}>
      <PaperText style={styles.header}>{children}</PaperText>
      <TouchableOpacity onPress={onPress}>
        <PaperText style={styles.btn}>
          {label} {icon && <Ionicons name="arrow-forward" />}
        </PaperText>
      </TouchableOpacity>
    </View>
  );
}

export default HeaderContent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    fontWeight: "500",
    color: DefaultTheme.btnColor700,
  },
});
