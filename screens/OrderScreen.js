import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import GroupOrderItems from "../components/common/GroupOrderItems";
import createAxios from "../utils/AxiosUtility";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function OrderScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { authState, getLocation } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const response = await API.customRequest(
        "get",
        "/carts",
        null,
        authState.token,
      );

      setCart(response.payload);
      setIsLoading(false);
    };
    const fetchLocationData = async () => {
      const response = await getLocation(authState?.token);
      response &&
        response.payload &&
        response.payload?.map(
          (item) => item.isDefault && setCurrentLocation(item),
        );
    };

    fetchCart();
    fetchLocationData();
  }, []);

  useEffect(() => {
    const onPlusTotalPriceHanler = () => {
      let price = 0;
      cart.forEach((order) => (price += order.totalAmount));
      setTotalPrice(price);
    };

    cart && onPlusTotalPriceHanler();
  }, [cart]);

  async function onPaymentHandler() {
    // const props = {
    //   businessDayId: cart.businessDayId,
    //   stationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   apartmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   famHubAndProduct: [
    //     {
    //       farmHubId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       orderDetail: [
    //         {
    //           productItemId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //           quantity: 0,
    //           unitPrice: 0,
    //           unit: "string",
    //           totalPrice: 0,
    //         },
    //       ],
    //       totalFarmHubPrice: 0,
    //     },
    //   ],
    //   totalAmount: 0,
    //   paymentStatus: "string",
    //   paymentAmount: 0,
    //   shipNote: "string",
    // };
    //
    // const res = await API.customRequest(
    //   "post",
    //   "/order/create",
    //   props,
    //   authState.token,
    // );
    // navigation.navigate("ReceiveInfoScreen");
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.primaryGreen700} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        <CardHeaderInfo navigation={navigation} location={currentLocation} />

        <ScrollView
          style={DefaultTheme.scrollContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <GroupOrderItems />
        </ScrollView>

        <CardFooter
          txtLabel="Tổng số tiền:"
          value={totalPrice}
          onPress={onPaymentHandler}
          btnLabel="Đặt hàng"
        />
      </SafeAreaView>
    );
  }
}

export default OrderScreen;

const styles = StyleSheet.create({
  bodyContent: {},
  textContent: {},
});
