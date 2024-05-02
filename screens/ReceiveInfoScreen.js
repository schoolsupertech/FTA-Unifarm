import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
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

      if (res.statusCode >= 200 && res.statusCode < 300) {
        setProcessed({
          ...processed,
          isSuccess: true,
          message: "Thanh toán thành công",
        });
        setPaidItem(res.payload);
        updateCartQty(authState?.token);
      } else {
        console.log(
          "Oops! Something went wrong\n" + JSON.stringify(res, null, 2),
        );
        setProcessed({
          ...processed,
          isSuccess: false,
          message: "Thanh toán thất bại",
        });
        if (res.statusCode >= 400 && res.statusCode < 500) {
          if (res.statusCode === 404) {
            Alert.alert("Lỗi rồi!", res.message, [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          }
          setPaidItem(res);
        }
      }

      setIsLoading(false);
    };

    fetchCheckoutHandler();
  }, []);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View style={styles.headerContainer}>
        {isLoading ? (
          <HeaderProcessPayment processing={isLoading} />
        ) : (
          <HeaderProcessPayment processing={isLoading} processed={processed} />
        )}
      </View>
      <Divider style={{ marginVertical: 20 }} />
      {Array.isArray(paidItem) ? (
        <ScrollView style={DefaultTheme.scrollContainer}>
          {paidItem.length > 0 &&
            paidItem.map((item) => (
              <GroupOrderItems key={item.id} order={item} />
            ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          {paidItem && paidItem.statusCode && paidItem.statusCode === 400 && (
            <>
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
            </>
          )}
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
