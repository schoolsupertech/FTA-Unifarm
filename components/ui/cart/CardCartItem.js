import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function CardCartItem({ item }) {
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

  return (
    <View style={styles.container}>
      <View style={{ marginRight: 12 }}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={DefaultTheme.flex_1}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textPrice}>30.000 vnđ / quả</Text>
      </View>
      <View style={styles.selectingQuantity}>
        <TouchableOpacity onPress={addCountHandler} style={styles.selectingBtn}>
          <Ionicons
            name="add-circle"
            size={20}
            color={Colors.primaryGreen700}
          />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.qty}</Text>
        <TouchableOpacity
          onPress={minusCountHandler}
          style={styles.selectingBtn}
        >
          <Ionicons
            name="remove-circle"
            size={20}
            color={Colors.primaryGreen700}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CardCartItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    height: 65,
    width: 65,
  },
  textName: {
    color: "black",
    fontWeight: "bold",
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
    backgroundColor: Colors.primaryGreen50,
    borderWidth: 1,
    borderColor: Colors.primaryGreen700,
    borderRadius: 8,
  },
  selectingBtn: {
    marginHorizontal: 12,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 18,
  },
});
