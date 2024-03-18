import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { DefaultTheme } from "../themes/DefaultTheme";

function OrderScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View>
        <Text>Chốt đơn</Text>
        <View>
          <Text>Thông tin nhận hàng</Text>
          <Text>Nhật Trường - số điện thoại</Text>
          <Text>
            Trạm nhận hàng số A-01, hầm 01, toà A, Chung cư Vinhomes Royal, Khu
            nhà giày, Phường Long Thạn Mỹ, Quận Thủ Đức, Thành phố Hồ Chí Minh.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OrderScreen;
