import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import { DefaultTheme } from "../../../themes/DefaultTheme";
import Title from "../../common/text/Title";

function CardCatItem({ title, image, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={DefaultTheme.flex_1} onPress={onPress}>
        <Card style={DefaultTheme.cardBgColor}>
          <Card.Cover
            style={styles.cover}
            resizeMode="cover"
            source={{ uri: image }}
          />
          <Card.Title title={title} titleStyle={styles.title} />
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default CardCatItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  cover: {
    margin: 16,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
