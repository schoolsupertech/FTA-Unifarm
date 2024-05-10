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
  const [isChecked, setIsChecked] = useState(null);

  console.log("Toggle cart: " + JSON.stringify(toggleCart, null, 2));
  console.log("Totle price in cart: " + totalPrice);

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

    if (response && response.statusCode === 200) {
      setCart(response.payload);

      // let totalCartPrice = 0;
      // response.payload.forEach((element) => {
      //   totalCartPrice += element.totalAmount;
      // });
      // setTotalPrice(totalCartPrice);

      // setIsChecked(new Array(response.payload.length).fill(false));
    }
    setIsLoading(false);
  };

  function onSettingPriceHandler(prodItemPrice) {
    let totalCartPrice = 0;
    totalCartPrice = totalPrice + prodItemPrice;
    console.log("Product item total price: " + prodItemPrice);
    console.log("Total cart price: " + totalCartPrice);

    setTotalPrice(totalCartPrice);
  }

  function onToggleGroupCartHandler(id) {
    const getOrderDetailResponse = cart.find((orders) => {
      return orders.id === id;
    }).orderDetailResponse;

    const order = {
      orderId: id,
      orderDetailIds: getOrderDetailResponse.map(
        (orderDetail) => orderDetail.id,
      ),
    };

    // const updatedChecked = isChecked.map((item, index) =>
    //   index === position ? !item : item,
    // );

    // setIsChecked(updatedChecked);

    // const addToggleCart = updatedChecked.map((item, index) => {
    //   if (index === position) {
    //     if (item) {
    //       console.log("Toggle cart is true at " + index);
    //       return {
    //         orderId: cart[index].id,
    //         orderDetailIds: cart[index].orderDetailResponse.map(
    //           (orderDetail) => orderDetail.id,
    //         ),
    //       };
    //     } else {
    //       return toggleCart.filter(
    //         (orders) =>
    //           orders && orders.orderId && orders.orderId !== cart[index].id,
    //       );
    //     }
    //   }
    // });

    // setToggleCart([...toggleCart, addToggleCart]);

    if (toggleCart.length > 0) {
      toggleCart.map((orders) =>
        orders.orderId === id
          ? setToggleCart(toggleCart.filter((orders) => orders.orderId !== id))
          : setToggleCart((prevToggleCart) => [...prevToggleCart, order]),
      );
    } else {
      setToggleCart([...toggleCart, order]);
    }
  }

  async function onDeleteHandler(orderDetailId) {
    setIsLoading(true);
    const response = await API.customRequest(
      "put",
      "/cart/update-quantity",
      {
        orderDetailId: orderDetailId,
        quantity: 0,
      },
      authState?.token,
    );
    console.log("Delete response: " + JSON.stringify(response, null, 2));
    setCart(null);
    fetchCart();
    setIsLoading(false);
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

  function onSelectedProdItemHandler(isChecked, orderDetailId, orderId) {
    const order = {
      orderId: orderId,
      orderDetailIds: [orderDetailId],
    };

    if (isChecked) {
      if (toggleCart.length > 0) {
        toggleCart.map((orders) => {
          if (orders.orderId === orderId) {
            setToggleCart(
              toggleCart.map(
                (items) =>
                  items.orderId === orderId && {
                    ...orders,
                    orderDetailIds: [...items.orderDetailIds, orderDetailId],
                  },
              ),
            );
          } else {
            setToggleCart([...toggleCart, order]);
          }
        });
      } else {
        setToggleCart([...toggleCart, order]);
      }
    } else {
      toggleCart.map((orders) =>
        orders.orderId === orderId && orders.orderDetailIds.length > 1
          ? setToggleCart(
              toggleCart.map(
                (items) =>
                  items.orderId === orderId && {
                    ...items,
                    orderDetailIds: items.orderDetailIds.filter(
                      (item) => item !== orderDetailId,
                    ),
                  },
              ),
            )
          : setToggleCart(
              toggleCart.filter((orders) => orders.orderId !== orderId),
            ),
      );
    }
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
                    toggleCart.find(
                      (orders) => orders.orderId === farmhub.id,
                    ) ? (
                      <Checkbox
                        status="checked"
                        onPress={() => onToggleGroupCartHandler(farmhub.id)}
                        color="black"
                      />
                    ) : (
                      <Checkbox
                        status="unchecked"
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
                  onSettingPrice={(priceValue) =>
                    onSettingPriceHandler(priceValue)
                  }
                  toggleCheckbox={toggleCart}
                  onSelectedProdItem={(isChecked, orderDetailId) =>
                    onSelectedProdItemHandler(
                      isChecked,
                      orderDetailId,
                      farmhub.id,
                    )
                  }
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
