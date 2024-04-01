import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import HeaderContent from "../components/common/HeaderContent";
import { DefaultTheme } from "../themes/DefaultTheme";

function WalletScreen({ route }) {
  const wallet = route.params.wallet;

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <HeaderContent>Thông tin ví</HeaderContent>
      <Text>Số dư ví: {wallet.balance}</Text>
    </SafeAreaView>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({});
