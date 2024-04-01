import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-paper";

import Title from "../../common/text/Title";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function CardCatItem({ title, image, onPress }) {
  return (
    <View style={styles.outterContainer}>
      <TouchableOpacity style={DefaultTheme.flex_1} onPress={onPress}>
        <Card style={styles.innerContainer} mode="contained">
          {image.includes("https://") ? (
            <Card.Cover
              style={styles.cover}
              resizeMode="cover"
              source={{ uri: image }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: 180,
                height: 180,
              }}
            >
              <ActivityIndicator size={"small"} />
            </View>
          )}
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
    marginBottom: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
  },
  innerContainer: {
    flex: 1,
    width: 'auto',
    backgroundColor: DefaultTheme.bgColor,
  
  },
  cover: {
    margin: 15,
    width: 'auto',
    height: 160,
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
