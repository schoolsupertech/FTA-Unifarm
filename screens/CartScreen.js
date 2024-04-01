import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import CardCartItem from "../components/ui/cart/CardCartItem";
import rootReducer from "../context/redux/reducers";
import { DefaultTheme } from "../themes/DefaultTheme";

const cartStore = configureStore({
  reducer: rootReducer,
});

function CartScreen() {
  const navigation = useNavigation();

  return (
    <Provider store={cartStore}>
      <SafeAreaView style={DefaultTheme.root}>
        <CardHeaderInfo />

        <ScrollView
          style={[
            DefaultTheme.scrollContainer,
            DefaultTheme.flex_1,
            { paddingTop: 12 },
          ]}
        >
          <CardCartItem />
        </ScrollView>

        <CardFooter
          txtLabel="Tổng số tiền: "
          txtValue="247.990"
          onPress={() => navigation.navigate("OrderScreen")}
          btnLabel="Thanh toán"
        />
      </SafeAreaView>
    </Provider>
  );
}

export default CartScreen;

const styles = StyleSheet.create({});
