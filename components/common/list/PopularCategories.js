import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import { DefaultTheme } from "../../../themes/DefaultTheme";

function PopularCategories({ title, image, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <Card.Cover
          style={styles.cover}
          source={{
            uri: image,
          }}
        />
        <Card.Content style={styles.content}>
          <Text style={styles.textContent}>{title}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default PopularCategories;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: 170,
    backgroundColor: DefaultTheme.cardBgColor,
  },
  cover: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 10,
  },
  content: {
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 8,
  },
  textContent: {
    fontWeight: "bold",
    alignSelf: "center",
  },
});
