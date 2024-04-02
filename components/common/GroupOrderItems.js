import React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

import GrayLine from "./text/GrayLine";
import Title from "./text/Title";
import { cartItems } from "../../constants/cartItems";
import { Ionicons } from "@expo/vector-icons";
import CardItemOrder from "./CardItemOrder";

function GroupItemsOrder() {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#f9f9f9",
        marginBottom: 5,
        borderRadius: 5,
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
              <Ionicons name="storefront-outline" size={25} color={"grey"} />
            </View>
          </View>
          <GrayLine />
          {cartItems.map((item, index) => (
            <CardItemOrder item={item} key={index} />
          ))}
        </View>
      }
    </View>
  );
}

export default GroupItemsOrder;

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
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
