import React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import GrayLine from "./text/GrayLine";
import Title from "./text/Title";
import CardItem from "./card/CardItem";
import { cartItems } from "../../constants/cartItems";

function GroupItems() {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#f9f9f9",
        marginBottom: 4,
        borderRadius: 4,
      }}
    >
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
              <Ionicons name="storefront-outline" size={24} color="grey" />
            </View>
          </View>
          <GrayLine />
          {cartItems.map((item, index) => (
            <CardItem item={item} key={index} />
          ))}
        </View>
      }
    </View>
  );
}

export default GroupItems;

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
    borderColor: "grey",
    transform: [
      {
        scale: 0.55,
      },
    ],
  },
  groupTitle: {
    flex: 1,
    marginLeft: 8,
    paddingLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderLeftWidth: 2,
    borderLeftColor: "gray",
  },
});
