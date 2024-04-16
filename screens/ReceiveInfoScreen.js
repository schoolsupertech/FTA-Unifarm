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

      if (res) {
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
      }

      setIsLoading(false);
    };

    fetchCheckoutHandler();
  }, []);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View style={styles.container}>
        {isLoading ? (
          <HeaderProcessPayment processing={isLoading} />
        ) : (
          <HeaderProcessPayment processing={isLoading} processed={processed} />
        )}
      </View>
      <Divider />
      <ScrollView style={DefaultTheme.scrollContainer}>
        {Array.isArray(paidItem) &&
          paidItem.length > 0 &&
          paidItem.map((item) => (
            <GroupOrderItems key={item.id} order={item} />
          ))}
      </ScrollView>
      <Divider />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Quay lại trang chủ</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={Colors.primaryGreen700}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ReceiveInfoScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    marginTop: 8,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: Colors.primaryGreen900,
  },
  btnText: {
    fontSize: 18,
    color: Colors.primaryGreen900,
  },
});
