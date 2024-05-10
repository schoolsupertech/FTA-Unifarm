import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, SegmentedButtons } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
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

function WalletScreen() {
  const { authState, userInfo, updateProfile } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const paymentResponse = await API.customRequest(
      "get",
      "/payments/user",
      null,
      authState?.token,
    );
    if (paymentResponse.statusCode === 200) {
      console.log(
        "Payment response: " + JSON.stringify(paymentResponse, null, 2),
      );
      setPaymentData(paymentResponse.payload);
    }

    const transactionResponse = await API.customRequest(
      "get",
      "/transactions",
      null,
      authState?.token,
    );
    if (transactionResponse.statusCode === 200) {
      console.log(
        "Transaction response: " + JSON.stringify(transactionResponse, null, 2),
      );
      setTransactionData(transactionResponse.payload);
    }

    setIsLoading(false);
  };

  async function onBrowsingHandler(url) {
    let result = await WebBrowser.openBrowserAsync(url);
    return result;
  }

  async function onPaymentHandler() {
    const response = await API.customRequest(
      "post",
      "/payment/create-payment-url",
      {
        walletId: userInfo.info.wallet.id,
        amount: amount,
      },
      authState?.token,
    );

    if (response) {
      console.log("VNPay HTTPS URL: " + response);
      let result = await onBrowsingHandler(response);
      if (result.type === "cancel") {
        setVisible(false);
        updateProfile(null, authState?.token);
        fetchData();
      }
    } else {
      Alert.alert("Oops! Something went wrong");
    }
  }

  function renderPaymentHistoryHandler() {
    return (
      <FlatList
        data={paymentData}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
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
              <Text style={{ fontWeight: 700 }}>Nạp tiền thành công.</Text>
              <Text style={{ fontWeight: 600 }}>
                Mã giao dịch: {itemData.item.code}
              </Text>
              <Text style={{ fontSize: 12, marginTop: 4 }}>
                {FORMAT.dateFormat(new Date(itemData.item.paymentDay))}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: Colors.primaryGreen600,
                alignSelf: "center",
              }}
            >
              + {FORMAT.currencyFormat(itemData.item.transferAmount)}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderTransactionHistoryHandler() {
    return (
      <FlatList
        data={transactionData}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity
            style={{
              marginTop: 12,
              flexDirection: "row",
              padding: 20,
              backgroundColor: "#EEEEEE",
              borderRadius: 8,
            }}
          >
            <Ionicons
              name="reader-sharp"
              size={40}
              color={Colors.primaryGreen700}
            />
            <View style={{ marginLeft: 8, flex: 1, marginRight: 12 }}>
              <Text style={{ fontWeight: 700 }}>
                {itemData.item.transactionType === "Refund"
                  ? "Thanh toán "
                  : "Hoàn tiền "}
                thành công
              </Text>
              <Text style={{ fontWeight: 600 }}>
                Mã đơn hàng: {itemData.item.orderId}
              </Text>
              <Text style={{ fontSize: 12, marginTop: 4 }}>
                {FORMAT.dateFormat(new Date(itemData.item.paymentDate))}
              </Text>
            </View>
            {itemData.item.transactionType === "Refund" ? (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "red",
                  alignSelf: "center",
                }}
              >
                - {FORMAT.currencyFormat(itemData.item.amount)}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.primaryGreen600,
                  alignSelf: "center",
                }}
              >
                + {FORMAT.currencyFormat(itemData.item.amount)}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    );
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
          <View
            style={{ padding: 20, borderTopWidth: 1, borderColor: "white" }}
          >
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
          <View style={{ paddingBottom: 12 }}>
            <Title
              icon={<Ionicons name="reload-sharp" size={20} color="gray" />}
              color="gray"
            >
              {" "}
              Hoạt động gần đây
            </Title>
            <SegmentedButtons
              style={{ marginTop: 12 }}
              value={value}
              onValueChange={setValue}
              theme={DefaultTheme.segmentBtn}
              buttons={[
                {
                  value: 0,
                  label: "Lịch sử nạp tiền",
                  labelStyle: {
                    fontWeight: 500,
                  },
                  icon: "bank-check",
                },
                {
                  value: 1,
                  label: "Lịch sử thanh toán",
                  labelStyle: {
                    fontWeight: 500,
                  },
                  icon: "ballot",
                },
              ]}
            />
          </View>
          {value === 0
            ? renderPaymentHistoryHandler()
            : renderTransactionHistoryHandler()}
        </View>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          style={styles.modalContainer}
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
}

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: "center",
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
