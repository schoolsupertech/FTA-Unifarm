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
  const [totalPrice, setTotalPrice] = useState(0);
  const { authState } = useContext(AuthContext);
  const [toggleCart, setToggleCart] = useState([]);

  console.log("Toggle cart: " + JSON.stringify(toggleCart, null, 2));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    const response = await API.customRequest(
      "get",
      "/carts",
      null,
      authState.token,
    );

    response && setCart(response.payload);
    setIsLoading(false);
  };

  useEffect(() => {
    const onPlusTotalPriceHanler = () => {
      let price = 0;
      cart.forEach((order) => (price += order.totalAmount));
      setTotalPrice(price);
    };

    cart && onPlusTotalPriceHanler();
  }, [cart]);

  function onToggleGroupCartHandler(id) {
    if (
      toggleCart.length > 0 &&
      toggleCart.map((orders) => orders.orderId === id)
    ) {
      setToggleCart(toggleCart.filter((orders) => orders.orderId !== id));
    } else {
      setToggleCart([
        ...toggleCart,
        {
          orderId: id,
          // orderDetailIds: toggleCart.map((orderDetailId) => [
          //   ...orderDetailId.orderDetailIds,
          //   cart.map((item) => item.orderDetailResponse.id),
          // ]),
          orderDetailIds: cart.map(
            (item) =>
              item.id === id &&
              item.orderDetailResponse
                .map((orderDetail) => orderDetail.id)
                .join(""),
          ),
        },
      ]);
    }
  }

  async function onDeleteHandler(orderDetailId) {
    const response = await API.customRequest(
      "put",
      "/cart/update-quantity",
      {
        orderDetailId: orderDetailId,
        quantity: 0,
      },
      authState?.token,
    );
    response && fetchCart();
  }

  async function onCheckoutHandler() {
    const response = await API.customRequest(
      "post",
      "/carts/before-checkout",
      toggleCart,
      authState?.token,
    );
    response &&
      navigation.navigate("OrderScreen", { payload: response.payload });
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
            {cart.map((farmhub) => (
              <View key={farmhub.farmHubId} style={styles.groupContainer}>
                <View style={styles.groupItems}>
                  <View style={styles.checkbox}>
                    {toggleCart.length > 0 &&
                    toggleCart.map((orders) =>
                      orders.orderId.includes(farmhub.id),
                    ) ? (
                      <Checkbox
                        status={"checked"}
                        onPress={() => onToggleGroupCartHandler(farmhub.id)}
                        color="black"
                      />
                    ) : (
                      <Checkbox
                        status={"unchecked"}
                        onPress={() => onToggleGroupCartHandler(farmhub.id)}
                        color="black"
                      />
                    )}
                  </View>
                  <View style={styles.groupTitle}>
                    <Ionicons
                      name="storefront-outline"
                      size={24}
                      style={{ marginRight: 4 }}
                    />
                    <Title color="black">{farmhub.farmHubResponse?.name}</Title>
                  </View>
                </View>
                <CardCartItem
                  data={farmhub.orderDetailResponse}
                  authState={authState}
                  stationId={farmhub.stationResponse.id}
                  toggleCheckbox={toggleCart}
                  onDelete={onDeleteHandler}
                />
              </View>
            ))}
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

        {Array.isArray(toggleCart) && toggleCart.length > 0 ? (
          <CardFooter
            txtLabel="Tổng tiền:"
            value={totalPrice}
            onPress={onCheckoutHandler}
            btnLabel="Thanh toán"
          />
        ) : (
          <CardFooter
            txtLabel="Tổng tiền:"
            value={totalPrice}
            onPress={() => {}}
            disabled={true}
            btnLabel="Thanh toán"
          />
        )}
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
        scale: 0.65,
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
