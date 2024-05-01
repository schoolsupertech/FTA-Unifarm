import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import { ActivityIndicator, ToggleButton } from "react-native-paper";

import GroupOrderItems from "../components/common/GroupOrderItems";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/colors";

const API = createAxios();

function HistoryOrderScreen({ route }) {
  const status = route.params?.status;
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  console.log("Route status: " + status);
  console.log("Orders: " + JSON.stringify(orders, null, 2));

  const statusOptions = [
    {
      status: "Pending",
      title: "Chờ xác nhận",
      style: {
        color: "lightskyblue",
        fontWeight: "500",
      },
    },
    {
      status: "Confirmed",
      title: "Chờ vận chuyển",
      style: {
        color: "lightseagreen",
        fontWeight: "500",
      },
    },
    {
      status: "OnDelivery",
      title: "Đang vận chuyển",
      style: {
        color: "seagreen",
        fontWeight: "500",
      },
    },
    {
      status: "ReadyForPickup",
      title: "Chờ nhận hàng",
      style: {
        color: "dodgerblue",
        fontWeight: "500",
      },
    },
    {
      status: "PickedUp",
      title: "Đã nhận hàng",
      style: {
        color: "limegreen",
        fontWeight: "500",
      },
    },
    {
      status: "Cancelled",
      title: "Đơn huỷ",
      style: {
        color: "orangered",
        fontWeight: "500",
      },
    },
    {
      status: "Expired",
      title: "Hết hạn",
      style: {
        color: "crimson",
        fontWeight: "500",
      },
    },
  ];

  useEffect(() => {
    if (status) {
      fetchOrder(status);
    } else {
      setIsLoading(true);
      API.customRequest("get", "/orders/get-all", null, authState?.token).then(
        (response) => {
          if (response.statusCode === 200) {
            setOrders(response.payload);
          } else {
            if (response.response) {
              console.log(
                "Fetch error: " + JSON.stringify(response.response, null, 2),
              );
            } else {
              setOrders(response.payload);
            }
          }
        },
      );
      setIsLoading(false);
    }
  }, [status]);

  async function fetchOrder(status) {
    setIsLoading(true);
    await API.customRequest(
      "get",
      "/orders/get-all?status=" + status,
      null,
      authState?.token,
    ).then((response) => {
      console.log("Response orders: " + JSON.stringify(response, null, 2));
      if (response.statusCode === 200) {
        setOrders(response.payload);
      } else {
        if (response.response) {
          console.log(
            "Fetch error: " + JSON.stringify(response.response, null, 2),
          );
        } else {
          setOrders(response.payload);
        }
      }
    });
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryGreen700} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        <View style={{ marginBottom: 8 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {statusOptions.map((item, index) => (
              <View key={index} style={styles.toggleBtnContainer}>
                <ToggleButton
                  icon={() => <Text style={item.style}>{item.title}</Text>}
                  value={item.status}
                  onPress={() => fetchOrder(item.status)}
                  style={[styles.toggleBtn, { borderColor: item.style.color }]}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          style={[{ flex: 1 }, DefaultTheme.scrollContainer]}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((item) => <GroupOrderItems key={item.id} order={item} />)
          ) : (
            <Text>Không có đơn hàng</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HistoryOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justirfyContent: "center",
    backgroundColor: "white",
  },
  toggleBtn: {
    width: "auto",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  toggleBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'whitesmoke',
  },
});
