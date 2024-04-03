import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/common/text/Title";
import CardCartItem from "../components/ui/cart/CardCartItem";
import CardFooter from "../components/common/card/CardFooter";
import { DefaultTheme } from "../themes/DefaultTheme";
import {
  removeFromCart,
  clearCart,
} from "../context/redux/actions/cartActions";
import { Checkbox } from "react-native-paper";
import { Colors } from "../constants/colors";

function CartScreen({ cart, removeFromCart, clearCart }) {
  const navigation = useNavigation();

  console.log("cart in Cart Screen: " + JSON.stringify(cart, null, 2));

  return (
    <SafeAreaView style={DefaultTheme.root}>
      {Array.isArray(cart.farmhubs) && cart.farmhubs.length > 0 ? (
        <ScrollView style={DefaultTheme.scrollContainer}>
          {cart.farmhubs.map((farmhub) => {
            return (
              <View key={farmhub.id} style={styles.groupContainer}>
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
                    <Title color="black">{farmhub.name}</Title>
                  </View>
                </View>
                <CardCartItem
                  data={farmhub.prodItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
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

      <CardFooter
        txtLabel="Tổng tiền:"
        value={247990}
        onPress={() => navigation.navigate("OrderScreen")}
        btnLabel="Thanh toán"
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  groupContainer: {
    borderBottomWidth: 8,
    borderColor: "#EEEEEE",
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
