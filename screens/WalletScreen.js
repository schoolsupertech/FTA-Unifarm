import React, { useCallback, useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";

import Title from "../components/common/text/Title";
import InputField from "../components/common/text/InputField";
import { TwoButtonBottom } from "../components/common/button/Buttons";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";
import { DefaultTheme } from "../themes/DefaultTheme";

const API = createAxios();
const FORMAT = createFormatUtil();

const dataHistory = [
  {
    id: 1,
    title: "Thanh toán hóa đơn 32F32AFCGDF thành công",
    price: "50.000 đ",
    dateTime: "12:02 01/04/2024",
  },
  {
    id: 2,
    title: "Thanh toán hóa đơn XD23V3SFV thành công nè",
    price: "45.000 đ",
    dateTime: "01:02 01/04/2024",
  },
];

function WalletScreen() {
  const { authState, userInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());

  console.log("Date: " + date);

  async function onPaymentHandler() {
    const response = await API.customRequest(
      "post",
      "/create-payment-url",
      {
        walletId: userInfo.info.wallet.id,
        amount: amount,
      },
      authState?.token,
    );

    console.log("Payment response: " + JSON.stringify(response, null, 2));

    // if (response) {
    //   const handlePress = useCallback(async () => {
    //     const supported = await Linking.canOpenURL(response);
    //     if (supported) {
    //       await Linking.openURL(response);
    //     } else {
    //       Alert.alert(`Không thể mở liên kết URL: ${response}`);
    //     }
    //   }, [response]);
    // }
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <LinearGradient
        colors={[Colors.primaryGreen700, Colors.primaryGreen200]}
        locations={[0.8, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: "auto",
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <View style={styles.topHeader}>
          <Ionicons
            name={"wallet-outline"}
            size={28}
            color={"white"}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.textHeader}>Ví Tiền</Text>
        </View>
        <View style={{ padding: 20, borderTopWidth: 1, borderColor: "white" }}>
          <Text style={{ color: "white", fontWeight: "500" }}>
            Số dư ví (đ)
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              marginBottom: 12,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              {userInfo &&
                userInfo.info &&
                FORMAT.currencyFormat(userInfo.info.wallet.balance)}
            </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "white",
                borderRadius: 5,
              }}
              onPress={() => setVisible(true)}
            >
              <Text
                style={{
                  color: Colors.primaryGreen700,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Nạp tiền
              </Text>
            </TouchableOpacity>
          </View>
          {/*
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 50,
              borderTopWidth: 1,
              borderTopColor: "white",
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={"card"} size={20} color={"white"} />
              <Text style={{ color: "white", fontWeight: "500", fontSize: 14 }}>
                {"  "}Bấm vào đây để rút tiền
              </Text>
            </View>
            <Ionicons name={"chevron-forward"} size={20} color={"white"} />
          </TouchableOpacity>
          */}
        </View>
      </LinearGradient>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Hoạt động gần đây
        </Text>
        <FlatList
          data={dataHistory}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: 12,
                flexDirection: "row",
                padding: 20,
                backgroundColor: "#EEEEEE",
                borderRadius: 8,
              }}
            >
              <Ionicons name="cash" size={40} color={Colors.primaryGreen700} />
              <View style={{ marginLeft: 8, flex: 1 }}>
                <Text style={{ fontWeight: "600" }}>{item.title}</Text>
                <Text style={{ fontSize: 12, marginTop: 4 }}>
                  {item.dateTime}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "red",
                  alignSelf: "center",
                }}
              >
                - {item.price}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={DefaultTheme.bottomModal}
      >
        <View style={DefaultTheme.modalContent}>
          <View style={{ marginBottom: 12 }}>
            <Title
              color={Colors.primaryGreen700}
              icon={
                <Ionicons
                  name="cash-sharp"
                  size={28}
                  color={Colors.primaryGreen700}
                  style={{ marginRight: 4 }}
                />
              }
            >
              Nạp tiền
            </Title>
          </View>
          <InputField
            label="Nhập số tiền bạn muốn nạp..."
            icon={
              <Ionicons
                name="cash"
                size={20}
                color="gray"
                style={{ marginRight: 4 }}
              />
            }
            maxLength={8}
            keyboardType={"number-pad"}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => setAmount(value)}
          />
          <TwoButtonBottom
            titleLeft="Huỷ bỏ"
            textColorLeft="white"
            buttonColorLeft="gray"
            onPressLeft={() => setVisible(false)}
            titleRight="Nạp tiền"
            textColorRight="white"
            buttonColorRight={Colors.primaryGreen700}
            onPressRight={onPaymentHandler}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryGreen700,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
