import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Button, Divider } from "react-native-paper";

import CardOrderItems from "./card/CardOrderItems";
import Title from "./text/Title";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "../../themes/DefaultTheme";
import { Colors } from "../../constants/colors";

function GroupOrderItems({ order, onCancel, onTracking }) {
  return (
    <View style={DefaultTheme.root}>
      {/*
       * const [farmhubGroup, setFarmhubGroup] = useState({ ...farmhubGroup, orders.filter((order) => order.farmhubId === prodItem.farmhubId) });
       * farmhubGroup.map((id) => {
       *
       * });
       */}
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
          <CardOrderItems item={item} key={item.id} />
        ))}
        {order.customerStatus !== null && order.customerStatus === "Pending" ? (
          <>
            <Divider style={{ marginVertical: 8 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={styles.trackingBtn} onPress={onTracking}>
                <Title
                  icon={
                    <Ionicons
                      name="arrow-forward-sharp"
                      size={20}
                      style={{ marginRight: 8 }}
                    />
                  }
                >
                  Theo dõi đơn hàng
                </Title>
              </TouchableOpacity>
              <Button
                icon="archive-off-outline"
                mode="contained"
                theme={{ colors: { primary: Colors.brandingError } }}
                style={{
                  width: "40%",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
                onPress={() =>
                  Alert.alert(
                    "Huỷ đơn hàng?",
                    "Bạn có chắc chắn muốn huỷ đơn hàng?",
                    [
                      {
                        text: "Không",
                        style: "cancel",
                      },
                      {
                        text: "Có",
                        onPress: () => onCancel(order.id),
                      },
                    ],
                  )
                }
              >
                Huỷ đơn
              </Button>
            </View>
          </>
        ) : (
          <>
            <Divider style={{ marginVertical: 8 }} />
            <TouchableOpacity style={styles.trackingBtn} onPress={onTracking}>
              <Title
                icon={
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={20}
                    style={{ marginRight: 8 }}
                  />
                }
              >
                Theo dõi đơn hàng
              </Title>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Divider style={{ marginVertical: 8 }} />
    </View>
  );
}

export default GroupOrderItems;

const styles = StyleSheet.create({
  groupContainer: {
    // width: "100%",
    marginVertical: 0,
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
    padding: 8,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  trackingBtn: {
    width: "50%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.primaryGreen50,
    borderRadius: 20,
  },
});
