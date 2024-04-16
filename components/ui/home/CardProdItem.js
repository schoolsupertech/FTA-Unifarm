import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card, Text as PaperText, ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CartBtn from "../../common/button/CartBtn";
import Title from "../../common/text/Title";
import createFormatUtil from "../../../utils/FormatUtility";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import { AuthContext } from "../../../context/AuthContext";

const FORMAT = createFormatUtil();

function CardProdItem(props) {
  const navigation = useNavigation();
  const [isCartAdded, setIsCartAdded] = useState(false);
  // const [prodItemImgsInfo, setProdItemImgsInfo] = useState(null);
  const { authState } = useContext(AuthContext);

  function selectedProductDetailHandler() {
    navigation.navigate("ProductDetail", {
      prodItemId: props.productItem.id,
      businessDayId: props.businessDayId,
    });
  }

  // useLayoutEffect(() => {
  //   const fetchProdItemImgs = async () => {
  //     await axios
  //       .get(BASE_URL + "/product-item/" + props.id + "/product-images")
  //       .then((res) => {
  //         let prodItemImgsInfo = res.data;
  //         setProdItemImgsInfo(prodItemImgsInfo.payload);
  //       })
  //       .catch((e) => {
  //         console.log(
  //           "An error occurred while loading API-product-item/{id}/product-images" +
  //             e,
  //         );
  //         console.log("Message: " + e.response.status);
  //       });
  //   };
  //
  //   fetchProdItemImgs();
  // }, []);

  useLayoutEffect(() => {
    isCartAdded && props.onAddingCart(isCartAdded);
    // console.log("ID: " + props.id + "; isCartAdded: " + isCartAdded);
  }, [isCartAdded]);

  function onToggleSnackBar() {
    if (authState?.authenticated) {
      setIsCartAdded(!isCartAdded);
      console.log("ID Product: " + props.id + "; isCartAdded: " + isCartAdded);
    }
  }

  function imgCoverHandler() {
    if (
      Array.isArray(props.productItem?.productImages) &&
      props.productItem?.productImages?.length > 0
    ) {
      return props.productItem.productImages.map(
        (item) =>
          item.displayIndex === 1 && (
            <Card.Cover
              key={item.id}
              style={styles.cover}
              source={{
                uri: item.imageUrl,
              }}
            />
          ),
      );
    }

    return (
      <Card.Cover
        style={styles.cover}
        source={require("../../../assets/images/plant_logo.png")}
      />
    );
  }

  return (
    <TouchableOpacity onPress={selectedProductDetailHandler}>
      <Card style={styles.container} mode="contained">
        <Card.Content style={styles.content}>
          {imgCoverHandler()}
          <Card.Content style={styles.textContent}>
            <Title>{props.productItem.title}</Title>
            <View style={styles.titleContent}>
              <View style={DefaultTheme.flex_1}>
                <PaperText variant="bodySmall" style={styles.listedPrice}>
                  {FORMAT.currencyFormat(props.salePrice * 9)}
                </PaperText>
                <PaperText
                  variant="titleLarge"
                  style={{ fontWeight: "500", color: "green", marginBottom: 4 }}
                >
                  {FORMAT.currencyFormat(props.salePrice)}
                </PaperText>
                <View style={styles.progressBarContent}>
                  <PaperText variant="bodySmall">Đã bán {props.sold}</PaperText>
                  <ProgressBar progress={0.5} color={DefaultTheme.pgBarColor} />
                </View>
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
    backgroundColor: DefaultTheme.bgColor,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
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
    marginTop: 4,
  },
  progressBarContent: {
    marginEnd: 32,
  },
  listedPrice: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
