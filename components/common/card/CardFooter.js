import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
          <Text
            variant="titleLarge"
            style={{
              color: Colors.primaryGreen700,
              fontWeight: 'bold',
              fontSize: 20
            }}
          >
            {txtValue} VNĐ
          </Text>
        </View>
        <View style={[DefaultTheme.btnView, styles.buttonView]}>
          <MainButton onPress={onPress}>{btnLabel}</MainButton>
        </View>
        {/* <View style={{padding: 20, backgroundColor: 'green'}}>
          <Text>Thanh toán</Text>
        </View> */}
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
    paddingBottom: 18,
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
    alignItems: 'flex-end'
  },
  buttonView: {
    marginBottom: 12,
    borderRadius: 8,
  },
});
