import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text as PaperText, ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CartBtn from "../button/CartBtn";
import { Color } from "../../constants/colors";
import { DefaultTheme } from "../../themes/DefaultTheme";

function ProdItem(props) {
  const navigation = useNavigation();
  const [isCartAdded, setOnCartAdded] = useState(false);

  function selectedProductDetailHandler() {
    navigation.navigate("ProductDetail", {
      prodId: props.id,
    });
  }

  function onToggleSnackBar() {
    setOnCartAdded(!isCartAdded);
  }

  return (
    <TouchableOpacity onPress={selectedProductDetailHandler}>
      <Card style={styles.container}>
        <Card.Content style={styles.content}>
          <Card.Cover
            style={styles.cover}
            source={{
              uri: props.gallery[0],
            }}
          />
          <Card.Content style={styles.textContent}>
            <PaperText variant="titleMedium" numberOfLines={2}>
              {props.title}
            </PaperText>
            <Card.Content style={{ marginVertical: 4, paddingHorizontal: 0 }}>
              <PaperText variant="bodySmall">Đã bán {props.sold}</PaperText>
              <ProgressBar progress={0.5} color={Color.brandingError} />
            </Card.Content>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <PaperText variant="bodyLarge">{props.price} Vnđ</PaperText>
                <PaperText
                  variant="bodySmall"
                  style={{ textDecorationLine: "line-through", color: "gray" }}
                >
                  {props.listedPrice} Vnđ
                </PaperText>
              </View>
              <CartBtn onCartAdded={isCartAdded} onPress={onToggleSnackBar} />
            </View>
          </Card.Content>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default ProdItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: DefaultTheme.cardBgColor,
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cover: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginStart: 16,
  },
});
