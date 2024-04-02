import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { DefaultTheme } from "../../themes/DefaultTheme";

function CardItemOrder({ item }) {
  const [count, setCount] = useState(item.qty);

  function addCountHandler() {
    if (count < 10) {
      setCount(count + 1);
    }
  }

  function minusCountHandler() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <View style={{ borderBottomWidth: 5, borderBottomColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <Checkbox status="unchecked" onPress={() => {}} color="black" />
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <View style={{ marginRight: 12 }}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={[DefaultTheme.flex_1, { marginRight: 12 }]}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textPrice}>{formatCurrency(30000)} / quả</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", marginTop: -15 }}>
        <View style={styles.selectingQuantity}>
          {/* <TouchableOpacity
            onPress={minusCountHandler}
            style={styles.selectingBtn}
          >
            <Ionicons
              name="remove-circle-outline"
              size={20}
              color={Colors.primaryGreen700}
            />
          </TouchableOpacity> */}
          <Text style={styles.quantity}>x{item.qty}</Text>
          {/* <TouchableOpacity
            onPress={addCountHandler}
            style={styles.selectingBtn}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={Colors.primaryGreen700}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

export default CardItemOrder;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
  },
  checkboxContainer: {
    transform: [
      {
        scale: 0.5,
      },
    ],
    marginRight: 0,
    paddingRight: 12,
    alignItems: "center",
    justifyContent: "center",
    // borderRightWidth: 1,
    // borderColor: "gray",
  },
  checkbox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "grey",
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  selectingQuantity: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.primaryGreen50,
    // borderWidth: 1,
    // borderColor: Colors.primaryGreen700,
    // borderRadius: 8,
    marginVertical: 5,
    justifyContent: "flex-start",
  },
  selectingBtn: {
    marginHorizontal: 4,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 15,
  },
});
