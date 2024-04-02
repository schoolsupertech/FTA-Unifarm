import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Title from "../../common/text/Title";
import GrayLine from "../../common/text/GrayLine";
import createAxios from "../../../utils/AxiosUtility";
import {
  removeFromCart,
  clearCart,
} from "../../../context/redux/actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";

const API = createAxios();

function CardCartItem({ cart, removeFromCart, clearCart }) {
  const [prodItemsInfo, setProdItemsInfo] = useState([]);

  console.log(
    "Product items in Cart Screen: " + JSON.stringify(prodItemsInfo, null, 2),
  );
  console.log("cart in Cart Screen: " + JSON.stringify(cart, null, 2));

  useEffect(() => {
    const getReduxCart = () => {
      const fetchProdItems = async (prodItem) => {
        const response = await API.get("/product-item/" + prodItem.id);
        if (prodItem.id === response.payload.id) {
          const updatedProdItemInfo = {
            ...prodItem,
            ...response.payload,
          };
          setProdItemsInfo([...prodItemsInfo, updatedProdItemInfo]);
        }
      };

      if (Array.isArray(cart.items) && cart.items.length !== 0) {
        cart.items.map((item) => {
          fetchProdItems(item);
        });
      }
    };

    getReduxCart();
  }, []);

  function onDeleteHandler(rowKey) {
    removeFromCart(rowKey);
    const newData = [...prodItemsInfo];
    const prevIndex = prodItemsInfo.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setProdItemsInfo(newData);
  }

  function renderItem(itemData, rowMap) {
    return (
      <View style={styles.rowFront}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {itemData.item.title}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {itemData.item.price} vnđ / {itemData.item.unit}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  function renderHiddenItem(itemData, rowMap) {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => onDeleteHandler(itemData.item.id)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {
        /*
         * const [farmhubGroup, setFarmhubGroup] = useState({ ...farmhubGroup, orders.filter((order) => order.farmhubId === prodItem.farmhubId) });
         * farmhubGroup.map((id) => {
         *
         * });
         */
        prodItemsInfo && prodItemsInfo.length ? (
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
            {/*
              prodItemsInfo.map((item, index) => (
              <CardItem item={item} key={index} />
            ))
            */}
            <SwipeListView
              data={prodItemsInfo}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75}
              disableRightSwipe
            />
          </View>
        ) : (
          <View
            style={[
              styles.groupContainer,
              {
                alignItems: "center",
                justifyContent: "center",
                height: 300,
                padding: 20,
              },
            ]}
          >
            <Ionicons name="bag-remove-outline" size={100} color="gray" />
            <Text style={styles.textEmptyCart}>
              Bạn chưa có sản phẩm nào được thêm vào giỏ hàng
            </Text>
          </View>
        )
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
  textEmptyCart: {
    color: "gray",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
