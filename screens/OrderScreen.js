import React, { useContext, useEffect, useState } from "react";
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
import {
  ActivityIndicator,
  Button,
  Divider,
  Text as PaperText,
} from "react-native-paper";

import CardHeaderInfo from "../components/common/card/CardHeaderInfo";
import CardFooter from "../components/common/card/CardFooter";
import GroupOrderItems from "../components/common/GroupOrderItems";
import createAxios from "../utils/AxiosUtility";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function OrderScreen({ route }) {
  const navigation = useNavigation();
  const selectedCheckoutProdItems = route.params.payload;
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toggleBaner, setToggleBanner] = useState(false);
  const { authState, userInfo } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchselectedCheckoutProdItems = async () => {
  //     setIsLoading(true);
  //     const response = await API.customRequest(
  //       "get",
  //       "/selectedCheckoutProdItemss",
  //       null,
  //       authState?.token,
  //     );
  //
  //     setselectedCheckoutProdItems(response.payload);
  //     setIsLoading(false);
  //   };
  //
  //   fetchselectedCheckoutProdItems();
  // }, []);

  useEffect(() => {
    const onPlusTotalPriceHanler = () => {
      let price = 0;
      selectedCheckoutProdItems.forEach(
        (order) => (price += order.totalAmount),
      );
      setTotalPrice(price);
    };

    selectedCheckoutProdItems && onPlusTotalPriceHanler();
  }, [selectedCheckoutProdItems]);

  async function onPaymentHandler() {
    const props = {
      stationId: userInfo.location?.station.id,
      fullName: selectedCheckoutProdItems[0].fullName,
      phoneNumber: selectedCheckoutProdItems[0].phoneNumber,
      orders: selectedCheckoutProdItems.map((orders) => {
        return {
          orderId: orders.id,
          orderDetailIds: orders.orderDetailResponse.map(
            (orderDetail) => orderDetail.id,
          ),
        };
      }),
    };

    console.log("Properties: " + JSON.stringify(props, null, 2));
    navigation.navigate("ReceiveInfoScreen", { payItems: props });
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
        <View style={{ backgroundColor: "#EEEEEE" }}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <PaperText variant="titleLarge" style={{ fontWeight: "bold" }}>
                Thông tin chi tiết
              </PaperText>
            </View>
            <Button
              icon="account-arrow-down-outline"
              mode="contained"
              theme={{
                colors: {
                  primary: Colors.primaryGreen700,
                },
              }}
              onPress={() => setToggleBanner(!toggleBaner)}
            >
              Mở rộng
            </Button>
          </View>
          <CardHeaderInfo visible={toggleBaner} navigation={navigation} />
        </View>

        <ScrollView
          style={[DefaultTheme.scrollContainer, { paddingTop: 8 }]}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.isArray(selectedCheckoutProdItems) &&
            selectedCheckoutProdItems.length > 0 &&
            selectedCheckoutProdItems.map((item) => (
              <GroupOrderItems key={item.id} order={item} />
            ))}
        </ScrollView>

        <CardFooter
          txtLabel="Tổng số tiền:"
          value={totalPrice}
          onPress={onPaymentHandler}
          btnLabel="Đặt hàng"
        />
      </SafeAreaView>
    );
  }
}

export default OrderScreen;

const styles = StyleSheet.create({
  headerContent: {
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContent: {},
  textContent: {},
});
