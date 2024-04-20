import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import GroupOrderItems from "../components/common/GroupOrderItems";

const API = createAxios();

function HistoryOrderScreen() {
  const { authState } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);

  console.log("History orders: " + JSON.stringify(orders, null, 2));

  useEffect(() => {
    API.customRequest(
      "get",
      "/orders/get-all?status=PickedUp",
      null,
      authState?.token,
    ).then((response) => {
      if (response) {
        if (response.response) {
          console.log(
            "Fetch error: " + JSON.stringify(response.response, null, 2),
          );
        } else {
          setOrders(response);
        }
      } else {
        console.log("No data");
      }
    });
  }, []);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <ScrollView
        style={DefaultTheme.scrollContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {Array.isArray(orders) &&
          orders.length > 0 &&
          orders.map((item) => <GroupOrderItems key={item.id} order={item} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HistoryOrderScreen;

const styles = StyleSheet.create({});
