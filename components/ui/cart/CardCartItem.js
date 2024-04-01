import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

import CardItem from "../../common/CardItem";
import Title from "../../common/text/Title";
import GrayLine from "../../common/text/GrayLine";
import createAxios from "../../../utils/AxiosUtility";
import {
  removeFromCart,
  clearCart,
} from "../../../context/redux/actions/cartActions";

const API = createAxios();

function CardCartItem({ cart, removeFromCart, clearCart }) {
  const [prodItemsInfo, setProdItemsInfo] = useState(cart);

  console.log(
    "Product Items Info in Cart: " + JSON.stringify(prodItemsInfo, null, 2),
  );

  useEffect(() => {
    const getReduxCart = () => {
      const fetchProdItems = async (prodItemId) => {
        const response = await API.get(
          "/product/" + prodItemId + "/product-items",
        );
        const getProdItemInfoId = prodItemsInfo.find(
          (item) => item.id === response.payload.id,
        );
        console.log(
          "Get Product Item Info Id: " +
            JSON.stringify(getProdItemInfoId, null, 2),
        );
        response.payload.map((items) => {
          if (items.id === getProdItemInfoId.id) {
            const updatedProdItemInfo = {
              ...getProdItemInfoId,
            };
            console.log(
              "Updated Product Item Info: " +
                JSON.stringify(updatedProdItemInfo, null, 2),
            );
          }
        });
      };

      if (cart && cart.items.length) {
        cart.items.map((items) => {
          console.log("Product Item Id in Cart: " + items.id);
          fetchProdItems(items.id);
        });
      }
    };

    getReduxCart();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {
        /*
         * const [farmhubGroup, setFarmhubGroup] = useState({ ...farmhubGroup, orders.filter((order) => order.farmhubId === prodItem.farmhubId) });
         * farmhubGroup.map((id) => {
         *
         * });
         */
        <View style={styles.groupContainer}>
          <View style={styles.groupItems}>
            <View style={styles.checkbox}>
              <Checkbox status="checked" onPress={() => {}} color="black" />
            </View>
            <View style={styles.groupTitle}>
              <Title color="black">Tôi là ông FarmHub A</Title>
            </View>
          </View>
          <GrayLine />
          {prodItemsInfo && prodItemsInfo.length ? (
            prodItemsInfo.map((item, index) => (
              <CardItem item={item} key={index} />
            ))
          ) : (
            <Text>No product</Text>
          )}
        </View>
      }
    </View>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardCartItem);

const styles = StyleSheet.create({
  groupContainer: {
    width: "100%",
    marginBottom: 12,
  },
  groupItems: {
    width: "100%",
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  checkbox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  groupTitle: {
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "gray",
  },
});
