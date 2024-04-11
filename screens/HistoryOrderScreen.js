import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function HistoryOrderScreen() {
  const { authState } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);

  console.log("History orders: " + JSON.stringify(orders, null, 2));

  useEffect(() => {
    API.customRequest("get", "/orders/get-all", null, authState?.token).then(
      (response) => {
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
      },
    );
  }, []);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      {orders &&
        orders.map((item) => (
          <View key={item.id}>
            <Text>{item.id}</Text>
            <Text>{item.code}</Text>
          </View>
        ))}
    </SafeAreaView>
  );
}

export default HistoryOrderScreen;

const styles = StyleSheet.create({});
