import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function TrackingOrderScreen({ route }) {
  const { authState } = useContext(AuthContext);
  const orderId = route.params?.orderId;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrderTracking = async () => {
      const response = await API.customeRequest(
        "get",
        "/order/tracking/" + orderId,
        null,
        authState?.token,
      );
      if (response.statusCode === 200) {
        setData(response.payload);
      } else {
        console.log(
          "Oops! Something went wrong" + JSON.stringify(response, null, 2),
        );
      }
    };

    fetchOrderTracking();
  }, []);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View>
        <Text>TrackingOrderScreen</Text>
      </View>
    </SafeAreaView>
  );
}

export default TrackingOrderScreen;

const styles = StyleSheet.create({});
