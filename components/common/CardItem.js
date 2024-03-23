import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";
import { DefaultTheme } from "../../themes/DefaultTheme";

function CardItem({ item }) {
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
          <Text style={styles.textPrice}>30.000 vnđ / quả</Text>
        </View>
        <View style={styles.selectingQuantity}>
          <TouchableOpacity
            onPress={addCountHandler}
            style={styles.selectingBtn}
          >
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
    </View>
  );
}

export default CardItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
  },
  checkboxContainer: {
    transform: [
      {
        scale: 0.75,
      },
    ],
    marginRight: 4,
    paddingRight: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "gray",
  },
  checkbox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginHorizontal: 4,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 14,
  },
});
