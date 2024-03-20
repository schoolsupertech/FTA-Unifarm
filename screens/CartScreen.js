import React, { useContext } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import MainButton from "../components/common/button/MainButton";
import HeaderContent from "../components/common/HeaderContent";
import GrayLine from "../components/common/text/GrayLine";
import AuthStack from "../navigators/AuthStack";
import { cartItems } from "../constants/cartItems";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/common/text/Title";
import Ellipsis from "../components/common/text/Ellipsis";
import CardCartItem from "../components/ui/cart/CardCartItem";

function CartScreen() {
  const navigation = useNavigation();
  const { userToken, userInfo } = useContext(AuthContext);

  console.log("User Info in Cart Screen: " + JSON.stringify(userInfo, null, 2));

  if (userToken) {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        <Card style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <HeaderContent onPress={() => {}} label={"Thay đổi"} icon={true}>
              Thông tin nhận hàng
            </HeaderContent>
            <GrayLine />
            <View style={styles.headerContent}>
              <Title color="gray">Người nhận hàng:</Title>
              <View style={styles.cardContentDetail}>
                <PaperText variant="titleSmall">
                  {userInfo.user.name} - {userInfo.user.email}
                </PaperText>
              </View>
              <GrayLine />
              <Title color="gray">Nhận hàng tại Station:</Title>
              <View style={styles.cardContentDetail}>
                <Ellipsis
                  description={
                    "Trạm nhận hàng số A-01, hầm 01, toà A, Chung cư Vinhomes Royal, Khu nhà giày, Phường Long Thạn Mỹ, Quận Thủ Đức, Thành phố Hồ Chí Minh."
                  }
                  numberOfLines={1}
                />
              </View>
              <GrayLine />
              <Title color="gray">
                Thời gian nhận:{" "}
                <PaperText variant="titleSmall" style={{ color: "black" }}>
                  Từ 16h, ngày mai (20/03)
                </PaperText>
              </Title>
            </View>
          </Card.Content>
        </Card>

        <ScrollView style={[DefaultTheme.scrollContainer, { paddingTop: 12 }]}>
          <View style={{ flex: 1 }}>
            {cartItems.map((item, index) => (
              <CardCartItem item={item} key={index} />
            ))}
          </View>
        </ScrollView>

        <View style={styles.safeAreaView}>
          <View
            style={{
              justifyContent: "flex-start",
              paddingBottom: 8,
            }}
          >
            <Text style={{ fontSize: 18, color: Colors.primaryGreen800 }}>
              Total price:
            </Text>
            <Text style={{ fontWeight: "bold", color: Colors.primaryGreen700 }}>
              240.700 VNĐ
            </Text>
          </View>
          <View style={styles.buttonView}>
            <MainButton onPress={() => navigation.navigate("OrderScreen")}>
              Thanh toán
            </MainButton>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return <AuthStack />;
  }
}

export default CartScreen;

const styles = StyleSheet.create({
  headerContent: {
    marginHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: DefaultTheme.cardBgColor,
  },
  cardContent: {
    marginVertical: 0,
    paddingVertical: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  cardContentDetail: {
    paddingHorizontal: 20,
  },
  safeAreaView: {
    backgroundColor: Colors.primaryGreen50,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    paddingHorizontal: 32,
    paddingBottom: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: "#e9f2eb",
    borderWidth: 1,
  },
  buttonView: {
    height: 50,
    width: "50%",
    marginBottom: 12,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    overflow: "visible",
  },
});
