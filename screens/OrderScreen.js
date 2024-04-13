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
import { ActivityIndicator, Divider } from "react-native-paper";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const response = await API.customRequest(
        "get",
        "/carts",
        null,
        authState?.token,
      );

      setCart(response.payload);
      setIsLoading(false);
    };

    fetchCart();
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
    const props = {
      stationId: cart[0].stationResponse.id,
      fullName: cart[0].fullName,
      phoneNumber: cart[0].phoneNumber,
      orders: [
        {
          orderId: cart[0].id,
          orderDetailIds: [cart[0].orderDetailResponse[0].id],
        },
      ],
    };

    const res = await API.customRequest(
      "post",
      "/order/Checkout",
      props,
      authState?.token,
    );
    navigation.navigate("ReceiveInfoScreen", { paidItem: res[0] });
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
        <CardHeaderInfo
          navigation={navigation}
          location={cart && cart[0].stationResponse}
        />

        <ScrollView
          style={DefaultTheme.scrollContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.isArray(cart) &&
            cart.length > 0 &&
            cart.map((item) => <GroupOrderItems key={item.id} order={item} />)}
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
