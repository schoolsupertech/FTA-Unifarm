import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/common/text/Title";
import CardCartItem from "../components/ui/cart/CardCartItem";
import CardFooter from "../components/common/card/CardFooter";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Checkbox } from "react-native-paper";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();
const FORMAT = createFormatUtil();

function CartScreen() {
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
          (item) => item.isDefault && setCurrentLocation(item.stationId),
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.primaryGreen700} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        <View
          style={{
            padding: 10,
            backgroundColor: Colors.warning,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="calendar"
              size={20}
              color="#303030"
              style={{ marginRight: 4 }}
            />
            <Text style={{ color: "#303030" }}>
              {FORMAT.dateFormat(new Date())}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={{ color: "red" }}>
              Lưu ý: Giỏ hàng của bạn sẽ được làm mới ở ngày tiếp theo
            </Text>
          </View>
        </View>

        {Array.isArray(cart) && cart.length > 0 ? (
          <ScrollView
            style={DefaultTheme.scrollContainer}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            {cart.map((farmhub) => {
              return (
                <View key={farmhub.farmHubId} style={styles.groupContainer}>
                  <View style={styles.groupItems}>
                    <View style={styles.checkbox}>
                      <Checkbox
                        status="checked"
                        onPress={() => {}}
                        color="black"
                      />
                    </View>
                    <View style={styles.groupTitle}>
                      <Ionicons
                        name="storefront-outline"
                        size={24}
                        style={{ marginRight: 4 }}
                      />
                      <Title color="black">
                        {farmhub.farmHubResponse?.name}
                      </Title>
                    </View>
                  </View>
                  <CardCartItem
                    data={farmhub.orderDetailResponse}
                    authState={authState}
                    stationId={currentLocation}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              paddingVertical: 20,
            }}
          >
            <Ionicons name="bag-remove-outline" size={100} color="gray" />
            <Text style={styles.textEmptyCart}>
              Bạn chưa có sản phẩm nào được thêm vào giỏ hàng
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 8,
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                borderBottomWidth: 0.5,
                borderColor: Colors.primaryGreen700,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.primaryGreen700,
                }}
              >
                Thêm sản phẩm vào giỏ hàng{" "}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={Colors.primaryGreen700}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Array.isArray(cart) && cart.length > 0 && ( */}
        <CardFooter
          txtLabel="Tổng tiền:"
          value={totalPrice}
          onPress={() => navigation.navigate("OrderScreen")}
          btnLabel="Thanh toán"
        />
        {/* ) */}
      </SafeAreaView>
    );
  }
}

export default CartScreen;

const styles = StyleSheet.create({
  groupContainer: {
    marginTop: 12,
    borderColor: "#EEEEEE",
    borderBottomWidth: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  groupItems: {
    flexDirection: "row",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkbox: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
    transform: [
      {
        scale: 0.75,
      },
    ],
  },
  groupTitle: {
    flexDirection: "row",
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: "gray",
  },
  textEmptyCart: {
    color: "gray",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
