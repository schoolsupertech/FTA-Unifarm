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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import { Colors } from "../../../constants/colors";

function CardCartItem({ data, removeFromCart }) {
  const [prodItemsInfo, setProdItemsInfo] = useState(data);

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: itemData.item.productImages.find((image) => {
                  return image.displayIndex === 1;
                }).imageUrl,
              }}
              style={styles.image}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 4,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={styles.title} numberOfLines={1}>
                {itemData.item.title}
              </Text>
              <Text style={styles.details} numberOfLines={1}>
                {itemData.item.price} vnđ / {itemData.item.unit}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.selectingQuantity}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.selectingBtn}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={20}
                    color={Colors.primaryGreen700}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{itemData.item.qty}</Text>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.selectingBtn}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color={Colors.primaryGreen700}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
    <SwipeListView
      data={prodItemsInfo}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      disableRightSwipe
    />
  );
}

export default CardCartItem;

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    height: 80,
    margin: 4,
    marginBottom: 4,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
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
  selectingQuantity: {
    height: 30,
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  selectingBtn: {
    marginHorizontal: 4,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 18,
  },
});
