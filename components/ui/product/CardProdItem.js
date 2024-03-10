import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text as PaperText, ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import CartBtn from "../../common/button/CartBtn";
import Title from "../../common/text/Title";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../api/config";

function CardProdItem(props) {
  const navigation = useNavigation();
  const [isCartAdded, setIsCartAdded] = useState(false);

  function selectedProductDetailHandler() {
    axios
      .get(BASE_URL + "/product-item/" + props.id)
      .then((res) => {
        let prodItemDetailInfo = res.data;
        navigation.navigate("ProductDetail", {
          prodItemId: prodItemDetailInfo.payload.id,
          prodItemTitle: prodItemDetailInfo.payload.title,
          prodItemDescription: prodItemDetailInfo.payload.description,
          prodItemSource: prodItemDetailInfo.payload.productOrigin,
          prodItemOutOfStock: prodItemDetailInfo.payload.outOfStock,
          prodItemPrice: prodItemDetailInfo.payload.price,
          prodItemQuantity: prodItemDetailInfo.payload.quantity,
          prodItemUnit: prodItemDetailInfo.payload.unit,
        });
      })
      .catch((e) => {
        console.log("An error occurred while loading API-prodItemDetail: " + e);
        console.log("Message: " + e.response.status);
      });
  }

  useEffect(() => {
    isCartAdded && props.onAddingCart(isCartAdded);
    // console.log("ID: " + props.id + "; isCartAdded: " + isCartAdded);
  }, [isCartAdded]);

  function onToggleSnackBar() {
    setIsCartAdded(!isCartAdded);
    console.log("ID Product: " + props.id + "; isCartAdded: " + isCartAdded);
  }

  return (
    <TouchableOpacity onPress={selectedProductDetailHandler}>
      <Card style={styles.container}>
        <Card.Content style={styles.content}>
          <Card.Cover
            style={styles.cover}
            source={{
              // uri: props.gallery[0],
              uri: "https://media.istockphoto.com/id/502966066/vi/anh/s%C6%B0%E1%BB%9Dn-c%E1%BB%ABu-t%C6%B0%C6%A1i-v%E1%BB%9Bi-gia-v%E1%BB%8B.jpg?s=2048x2048&w=is&k=20&c=CKoauRZRj7VA098Mzxy8qP0r_X_mRIZ8k-T3xy-2j10=",
            }}
          />
          <Card.Content style={styles.textContent}>
            <Title>{props.title}</Title>
            <View style={styles.titleContent}>
              <View style={DefaultTheme.flex_1}>
                <View style={styles.progressBarContent}>
                  <PaperText variant="bodySmall">
                    Đã bán {/* props.sold */}
                  </PaperText>
                  <ProgressBar progress={0.5} color={DefaultTheme.pgBarColor} />
                </View>
                <PaperText variant="bodyLarge">{props.price} Vnđ</PaperText>
                <PaperText variant="bodySmall" style={styles.listedPrice}>
                  {/* props.listedPrice */} Vnđ
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

export default CardProdItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: DefaultTheme.cardBgColor,
    marginBottom: 12,
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
  titleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  progressBarContent: {
    marginEnd: 32,
  },
  listedPrice: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
