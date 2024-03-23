import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import { DefaultTheme } from "../themes/DefaultTheme";
import GroupItems from "../components/common/GroupItems";

function CartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <CardHeaderInfo />

      <ScrollView
        style={[
          DefaultTheme.scrollContainer,
          DefaultTheme.flex_1,
          { paddingTop: 12 },
        ]}
      >
        <GroupItems />
      </ScrollView>

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
