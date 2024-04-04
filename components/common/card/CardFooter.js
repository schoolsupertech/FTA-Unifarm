import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import MainButton from "../button/MainButton";
import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

const FORMAT = createFormatUtil();

function CardFooter({ txtLabel, value, onPress, btnLabel }) {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftContent}>
          <PaperText
            variant="bodyMedium"
            style={{
              fontWeight: "600",
              color: Colors.primaryGreen800,
            }}
          >
            {txtLabel}
          </PaperText>
          <PaperText
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              color: Colors.primaryGreen900,
            }}
          >
            {FORMAT.currencyFormat(value)}
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
    height: 110,
    paddingBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  leftContent: {
    marginRight: 22,
    paddingBottom: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonView: {
    marginBottom: 12,
    borderRadius: 8,
  },
});
