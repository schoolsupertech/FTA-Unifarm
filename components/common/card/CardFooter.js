import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import MainButton from "../button/MainButton";
import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function CardFooter({ txtLabel, txtValue, onPress, btnLabel }) {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftContent}>
          <PaperText
            variant="bodyMedium"
            style={{
              fontWeight: "bold",
              color: Colors.primaryGreen800,
            }}
          >
            {txtLabel}
          </PaperText>
          <PaperText
            variant="titleLarge"
            style={{
              color: Colors.primaryGreen700,
            }}
          >
            {txtValue} VNĐ
          </PaperText>
        </View>
        <View style={[DefaultTheme.btnView, styles.buttonView]}>
          <MainButton onPress={onPress}>{btnLabel}</MainButton>
        </View>
      </Card.Content>
    </Card>
  );
}

export default CardFooter;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: DefaultTheme.cardBgColor,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    paddingHorizontal: 32,
    paddingBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    marginRight: 12,
    paddingBottom: 8,
    justifyContent: "flex-start",
  },
  buttonView: {
    marginBottom: 12,
    borderRadius: 8,
  },
});
