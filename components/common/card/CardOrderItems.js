import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";

const FORMAT = createFormatUtil();

function CardOrderItems({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={{ marginRight: 12 }}>
          <Image
            source={{
              // item.productItemResponse.imageUrl
              uri: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.textName}>{item.productItemResponse.title}</Text>
          <Text style={styles.textPrice}>
            {FORMAT.currencyFormat(item.unitPrice)} /{" "}
            {item.productItemResponse.unit}
          </Text>
        </View>
      </View>
      <View style={styles.totalQuantityContainer}>
        <Text style={styles.quantity}>x{item.quantity}</Text>
      </View>
    </View>
  );
}

export default CardOrderItems;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginHorizontal: 28,
    flexDirection: "row",
  },
  // checkboxContainer: {
  //   transform: [
  //     {
  //       scale: 0.5,
  //     },
  //   ],
  //   marginRight: 0,
  //   paddingRight: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // borderRightWidth: 1,
  //   // borderColor: "gray",
  // },
  // checkbox: {
  //   borderRadius: 8,
  //   borderWidth: 2,
  //   borderColor: "grey",
  // },
  itemsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: 55,
    width: 55,
  },
  textName: {
    color: "black",
    fontWeight: "600",
    fontSize: 15,
  },
  textPrice: {
    color: Colors.primaryGreen700,
    fontWeight: "500",
  },
  // selectingQuantity: {
  //   height: 30,
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   // backgroundColor: Colors.primaryGreen50,
  //   // borderWidth: 1,
  //   // borderColor: Colors.primaryGreen700,
  //   // borderRadius: 8,
  //   marginVertical: 5,
  // },
  // selectingBtn: {
  //   marginHorizontal: 4,
  // },
  totalQuantityContainer: {
    marginLeft: -12,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 16,
  },
});
