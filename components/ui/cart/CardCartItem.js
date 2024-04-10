import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import { Colors } from "../../../constants/colors";
import CardCartProdItems from "./CardCartProdItems";

function CardCartItem({ data, authState, stationId }) {
  const [prodItemsInfo, setProdItemsInfo] = useState(data);

  function onDeleteHandler(rowKey) {
    const newData = [...prodItemsInfo];
    const prevIndex = prodItemsInfo.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setProdItemsInfo(newData);
  }

  function renderItem(itemData, rowMap) {
    const props = {
      orderId: itemData.item.orderId,
      productItemId: itemData.item.productItemId,
      quantity: itemData.item.quantity,
      unitPrice: itemData.item.unitPrice,
      unit: itemData.item.unit,
      totalPrice: itemData.item.totalPrice,
      productItemResponse: {
        id: itemData.item.productItemResponse.id,
        productId: itemData.item.productItemResponse.productId,
        farmHubId: itemData.item.productItemResponse.farmHubId,
        title: itemData.item.productItemResponse.title,
        description: itemData.item.productItemResponse.description,
        specialTag: itemData.item.productItemResponse.specialTag,
        storageType: itemData.item.productItemResponse.storageType,
        outOfStock: itemData.item.productItemResponse.outOfStock,
        unit: itemData.item.productItemResponse.unit,
        status: itemData.item.productItemResponse.status,
        productOrigin: itemData.item.productItemResponse.productOrigin,
      },
    };

    return (
      <CardCartProdItems
        key={itemData.item.id}
        {...props}
        authState={authState}
        stationId={stationId}
      />
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
    <SwipeListView
      data={prodItemsInfo}
      key={(item) => item.orderId}
      keyExtractor={(item) => item.orderId}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      disableRightSwipe
    />
  );
}

export default CardCartItem;

const styles = StyleSheet.create({
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
