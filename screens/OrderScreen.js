import React from "react";
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

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import GroupOrderItems from "../components/common/GroupOrderItems";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";

function OrderScreen() {
  const navigation = useNavigation();

  function onPaymentHandler() {
    console.log("Successfully paid");
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <ScrollView
        style={[
          DefaultTheme.scrollContainer,
          DefaultTheme.flex_1,
          { paddingTop: 10 },
        ]}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <GroupOrderItems />
      </ScrollView>

      <CardFooter
        txtLabel="Tổng số tiền: "
        txtValue="247.990"
        onPress={onPaymentHandler}
        btnLabel="Xác nhận"
      />
    </SafeAreaView>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({
  bodyContent: {},
  textContent: {},
});
