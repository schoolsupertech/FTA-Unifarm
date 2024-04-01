import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import { DefaultTheme } from "../themes/DefaultTheme";
import GroupItems from "../components/common/GroupItems";
import { Ionicons } from "@expo/vector-icons";

function CartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={DefaultTheme.root}>
        <View style={{padding: 10,backgroundColor:'#FFFAB5'}}>
          <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 15}}>
          <Ionicons name="cart" size={20} color={'black'}/>
          <Text style={{color: '#000'}}>{"   "}Đừng quên sử dụng mã giảm giá bạn nhé!</Text>
          </View>
          </View>
      <ScrollView
        style={[
          DefaultTheme.scrollContainer,
          DefaultTheme.flex_1,
          { paddingTop: 12 },
        ]}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
      >
        <GroupItems />
        <GroupItems />
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
