import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import { DefaultTheme } from "../../../themes/DefaultTheme";
import Title from "../../common/text/Title";

function CardCatItem({ title, image, onPress }) {
  return (
    <View style={styles.outterContainer}>
      <TouchableOpacity style={DefaultTheme.flex_1} onPress={onPress}>
        <Card style={styles.innerContainer}>
          <Card.Cover
            style={styles.cover}
            resizeMode="cover"
            source={{ uri: image }}
          />
          <Card.Content style={styles.content}>
            <Title>{title}</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default CardCatItem;

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    margin: 16,
  },
  innerContainer: {
    flex: 1,
    width: 180,
    backgroundColor: DefaultTheme.cardBgColor,
  },
  cover: {
    margin: 16,
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  content: {
    marginVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
