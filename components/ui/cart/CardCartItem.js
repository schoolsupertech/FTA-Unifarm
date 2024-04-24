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

function CardCartItem({
  data,
  authState,
  stationId,
  toggleCheckbox,
  onDelete,
}) {
  const [prodItemsInfo, setProdItemsInfo] = useState(data);

  // function onDeleteHandler(rowKey) {
  //   const newData = [...prodItemsInfo];
  //   const prevIndex = prodItemsInfo.findIndex((item) => item.id === rowKey);
  //   newData.splice(prevIndex, 1);
  //   setProdItemsInfo(newData);
  // }

  function renderItem(itemData, rowMap) {
    const props = {
      id: itemData.item.id,
      orderId: itemData.item.orderId,
      productItemId: itemData.item.productItemId,
      quantity: itemData.item.quantity,
      unitPrice: itemData.item.unitPrice,
      unit: itemData.item.unit,
      totalPrice: itemData.item.totalPrice,
      quantityInStock: itemData.item.quantityInStock,
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
        imageUrl: itemData.item.productItemResponse.imageUrl,
      },
    };

    if (
      Array.isArray(toggleCheckbox) &&
      toggleCheckbox.length > 0 &&
      toggleCheckbox.find((orders) => orders.orderId === itemData.item.orderId)
    ) {
      return (
        <CardCartProdItems
          key={itemData.item.id}
          {...props}
          authState={authState}
          stationId={stationId}
          toggleCheckbox={true}
        />
      );
    } else {
      return (
        <CardCartProdItems
          key={itemData.item.id}
          {...props}
          authState={authState}
          stationId={stationId}
          toggleCheckbox={false}
        />
      );
    }
  }

  function renderHiddenItem(itemData, rowMap) {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => onDelete(itemData.item.id)}
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
    // height: 79,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 12,
    margin: 4,
    // marginBottom: 15,
    borderRadius: 8,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    height: 79,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
