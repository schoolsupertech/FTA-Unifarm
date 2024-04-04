import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";
import { DefaultTheme } from "../../../themes/DefaultTheme";

const FORMAT = createFormatUtil();

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
    <View style={{ borderBottomWidth: 5, borderBottomColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <Checkbox status="unchecked" onPress={() => {}} color="black" />
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <View style={{ marginRight: 12 }}>
            <Image
              source={{
                uri: item.productImages.find((image) => {
                  return image.displayIndex === 1;
                }).imageUrl,
              }}
              style={styles.image}
            />
          </View>
          <View style={[DefaultTheme.flex_1, { marginRight: 12 }]}>
            <Text style={styles.textName}>{item.title}</Text>
            <Text style={styles.textPrice}>
              {FORMAT.currencyFormat(item.price)} / {item.unit}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", marginTop: -15 }}>
        <View style={styles.selectingQuantity}>
          <TouchableOpacity
            onPress={minusCountHandler}
            style={styles.selectingBtn}
          >
            <Ionicons
              name="remove-circle-outline"
              size={20}
              color={Colors.primaryGreen700}
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>{count}</Text>
          <TouchableOpacity
            onPress={addCountHandler}
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
  );
}

export default CardItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 4,
    borderBottomColor: DefaultTheme.bgColor,
  },
  checkboxContainer: {
    transform: [
      {
        scale: 0.6,
      },
    ],
    paddingRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "grey",
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
  textName: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
  textPrice: {
    color: Colors.primaryGreen700,
    fontWeight: "500",
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
