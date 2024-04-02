import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import CardCartItem from "../components/ui/cart/CardCartItem";
import { DefaultTheme } from "../themes/DefaultTheme";

function CartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <CardHeaderInfo />

      <CardCartItem />

      <CardFooter
        txtLabel="Tổng số tiền: "
        txtValue="247.990"
        onPress={() => navigation.navigate("OrderScreen")}
        btnLabel="Thanh toán"
      />
    </SafeAreaView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({});
