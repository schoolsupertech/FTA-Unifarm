import React from "react";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import CardOrderItems from "./card/CardOrderItems";
import Title from "./text/Title";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "../../themes/DefaultTheme";

function GroupOrderItems({ order }) {
  return (
    <View style={DefaultTheme.root}>
      {
        /*
         * const [farmhubGroup, setFarmhubGroup] = useState({ ...farmhubGroup, orders.filter((order) => order.farmhubId === prodItem.farmhubId) });
         * farmhubGroup.map((id) => {
         *
         * });
         */
        <View style={styles.groupContainer}>
          <View style={styles.groupTitle}>
            <Title
              icon={
                <Ionicons
                  name="storefront-outline"
                  size={24}
                  color={"black"}
                  style={{ marginRight: 4 }}
                />
              }
              color="black"
            >
              {order.farmHubResponse?.name}
            </Title>
          </View>
          {order.orderDetailResponse?.map((item) => (
            <CardOrderItems item={item} key={item.orderId} />
          ))}
          <Divider style={{ marginTop: 8 }} />
        </View>
      }
    </View>
  );
}

export default GroupOrderItems;

const styles = StyleSheet.create({
  groupContainer: {
    width: "100%",
    marginVertical: 8,
  },
  // groupItems: {
  //   width: "100%",
  //   marginHorizontal: 4,
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "baseline",
  // },
  // checkbox: {
  //   borderRadius: 8,
  //   borderWidth: 2,
  //   borderColor: "grey",
  //   transform: [
  //     {
  //       scale: 0.55,
  //     },
  //   ],
  // },
  groupTitle: {
    marginBottom: 12,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
});
