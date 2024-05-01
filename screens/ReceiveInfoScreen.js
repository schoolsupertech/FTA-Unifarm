import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text as PaperText } from "react-native-paper";

import HeaderProcessPayment from "../components/common/process/HeaderProcessPayment";
import GroupOrderItems from "../components/common/GroupOrderItems";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";
import createAxios from "../utils/AxiosUtility";
import { Divider } from "react-native-paper";
import { DefaultTheme } from "../themes/DefaultTheme";

const API = createAxios();

function ReceiveInfoScreen({ route }) {
  const payItems = route.params.payItems;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [paidItem, setPaidItem] = useState(null);
  const [processed, setProcessed] = useState({
    isSuccess: false,
    message: "",
  });
  const { authState, updateCartQty } = useContext(AuthContext);

  useEffect(() => {
    const fetchCheckoutHandler = async () => {
      setIsLoading(true);

      const res = await API.customRequest(
        "post",
        "/order/Checkout",
        payItems,
        authState?.token,
      );

      if (res.statusCode === 200 || res.statusCode === 201) {
        setProcessed({
          ...processed,
          isSuccess: true,
          message: "Thanh toán thành công",
        });
        setPaidItem(res);
        updateCartQty(authState?.token);
      } else {
        setProcessed({
          ...processed,
          isSuccess: false,
          message: "Thanh toán thất bại",
        });
        setPaidItem("Ví không đủ tiền. Vui lòng nạp thêm tiền vào ví!");
      }

      setIsLoading(false);
    };

    fetchCheckoutHandler();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View style={styles.headerContainer}>
        {isLoading ? (
          <HeaderProcessPayment processing={isLoading} />
        ) : (
          <HeaderProcessPayment processing={isLoading} processed={processed} />
        )}
      </View>
      <Divider />
      {Array.isArray(paidItem) ? (
        <ScrollView style={DefaultTheme.scrollContainer}>
          {paidItem.length > 0 &&
            paidItem.map((item) => (
              <GroupOrderItems key={item.id} order={item} />
            ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <PaperText
            variant="titleLarge"
            style={{ fontWeight: "500", color: Colors.brandingError }}
          >
            {paidItem}
          </PaperText>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Wallet")}
          >
            <Text style={styles.btnText}>Nạp tiền</Text>
          </TouchableOpacity>
        </View>
      )}
      <Divider />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Quay lại trang chủ</Text>
        <Ionicons name="arrow-forward" size={18} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ReceiveInfoScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryGreen900,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
