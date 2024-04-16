import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Badge, Text as PaperText, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import GrayLine from "../components/common/text/GrayLine";
import Ellipsis from "../components/common/text/Ellipsis";
import SwiperSlide from "../components/ui/product/SwiperSlide";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();
const FORMAT = createFormatUtil();

let defaultCount = 1;

function ProductDetailScreen({ route, navigation }) {
  const prodItemId = route.params.prodItemId;
  const businessDayId = route.params.businessDayId;
  const [selectedProd, setSelectedProd] = useState(null);
  const [count, setCount] = useState(defaultCount);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const { authState, userInfo, updateCartQty } = useContext(AuthContext);

  useEffect(() => {
    const fetchProdItemData = async () => {
      const response = await API.get("/product-item/" + prodItemId);
      response && setSelectedProd(response.payload);
    };

    fetchProdItemData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedProd !== null ? selectedProd.title : "Product Detail",
      headerRight: () => {
        return authState?.authenticated ? (
          <>
            {userInfo && userInfo.qtyInCart ? (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginEnd: 16 }}
                  onPress={() => navigation.navigate("CartScreen")}
                >
                  <Ionicons
                    name="cart"
                    color={Colors.primaryGreen700}
                    size={24}
                  />
                  <Badge
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -12,
                    }}
                  >
                    {userInfo.qtyInCart}
                  </Badge>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginEnd: 4 }}
                  onPress={() => navigation.navigate("Notification")}
                >
                  <Ionicons
                    name="notifications"
                    color={Colors.primaryGreen700}
                    size={24}
                  />
                  <Badge
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -12,
                    }}
                  >
                    {userInfo.qtyInCart}
                  </Badge>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginEnd: 16 }}
                  onPress={() => navigation.navigate("CartScreen")}
                >
                  <Ionicons
                    name="cart-outline"
                    color={Colors.primaryGreen700}
                    size={24}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginEnd: 4 }}
                  onPress={() => navigation.navigate("Notification")}
                >
                  <Ionicons
                    name="notifications-outline"
                    color={Colors.primaryGreen700}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : null;
      },
    });
  }, [selectedProd, authState, navigation]);

  function addCountHandler() {
    if (count < selectedProd.quantity) {
      setCount(count + 1);
    }
  }

  function minusCountHandler() {
    if (count > defaultCount) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    console.log("Changed count: " + count);
  }, [addCountHandler, minusCountHandler]);

  async function fetchAddToCart() {
    const response = await API.customRequest(
      "post",
      "/cart/upsert-to-cart",
      {
        farmHubId: selectedProd.farmHubId,
        stationId: userInfo.location?.station.id,
        businessDayId: businessDayId,
        productItemId: selectedProd.id,
        quantity: count,
        isAddToCart: true,
      },
      authState?.token,
    );

    if (response.response && response.response.status === 400) {
      console.log(
        "Fetch error at fetchAddToCart: " +
          JSON.stringify(response.response, null, 2),
      );
    } else {
      updateCartQty(authState?.token);
      return response.payload;
    }
  }

  async function addingCartHandler() {
    if (authState?.authenticated) {
      const res = await fetchAddToCart();
      if (res) {
        setVisible(true);
        setSnackbarLabel("Đã thêm vào giỏ hàng");
      }
    } else {
      Alert.alert("Bạn cần phải đăng nhập trước", [{ text: "OK" }]);
      navigation.navigate("AuthScreen");
    }
  }

  return (
    <SafeAreaView style={[DefaultTheme.root, styles.container]}>
      {selectedProd ? (
        <>
          <ScrollView
            style={{ marginHorizontal: 10, marginBottom: 72 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.headerContainer}>
              <SwiperSlide prodItemId={selectedProd.id} />
              <View style={styles.headerContent}>
                <PaperText variant="titleLarge" style={{ fontWeight: "bold" }}>
                  {selectedProd.title}
                </PaperText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <PaperText
                    variant="titleLarge"
                    style={{ fontWeight: "500", color: Colors.primaryGreen700 }}
                  >
                    {FORMAT.currencyFormat(selectedProd.price)} /{" "}
                    {selectedProd.unit}
                  </PaperText>
                  <View style={styles.selectingQuantity}>
                    <TouchableOpacity
                      onPress={minusCountHandler}
                      style={styles.selectingBtn}
                    >
                      <Ionicons
                        name="remove-circle"
                        size={28}
                        color={Colors.primaryGreen700}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{count}</Text>
                    <TouchableOpacity
                      onPress={addCountHandler}
                      style={styles.selectingBtn}
                    >
                      <Ionicons
                        name="add-circle"
                        size={28}
                        color={Colors.primaryGreen700}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <GrayLine />
                <PaperText variant="titleSmall">
                  Đã bán: 199 {/* prodItem.sold */}
                </PaperText>
                <PaperText variant="titleSmall">
                  Nguồn gốc: {selectedProd.productOrigin}
                </PaperText>
                <PaperText variant="titleSmall" style={{ marginTop: 4 }}>
                  Ngày mở bán: 01/12/2024{/* prodItem.openDate */}
                </PaperText>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <PaperText
                variant="headlineSmall"
                style={styles.descriptionHeader}
              >
                Thông tin sản phẩm
              </PaperText>
              <Ellipsis
                description={selectedProd.description}
                data={[
                  "Độ tươi: 100%",
                  "Chế độ nấu: luộc, chiên, hấp, xào,…",
                  "Kiểu chế biến: gọt vỏ, rửa bằng nước muối, cắt lát hoặc cắt miếng to, có thể cho vào máy say,...",
                  "Ngày hết hạn: 23/04/2099",
                  "Hướng dẫn sử dụng: dùng ngay || phải thông qua kiểu chế biến và chế độ nấu phù hợp, để đạt được độ ngon nhất của món ăn phải nêm thêm các gia vị cần thiết, lưu ý bảo quản thực phẩm trong tủ lạnh,...",
                ]}
                numberOfLines={3}
              />
            </View>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: "Xong",
              onPress: () => setVisible(false),
            }}
            style={{ marginBottom: 80 }}
          >
            {snackbarLabel}
          </Snackbar>
          <View style={styles.safeAreaView}>
            <View style={styles.buttonView}>
              {/* <MainButton onPress={addingCartHandler}>Thêm vào giỏ</MainButton> */}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primaryGreen700,
                  flexDirection: "row",
                  padding: 12,
                  alignItems: "center",
                  borderRadius: 8,
                  justifyContent: "center",
                }}
                activeOpacity={0.5}
                onPress={addingCartHandler}
              >
                <Ionicons name="cart-outline" size={28} color={"white"} />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: Colors.primaryGreen50,
                  }}
                >
                  {"  "}Thêm vào giỏ hàng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Loading...</Text>
      )}
    </SafeAreaView>
  );
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {},
  headerContent: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  descriptionContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  safeAreaView: {
    backgroundColor: "#f5f5f5",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 110,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 32,
    paddingBottom: 12,
    borderColor: "#e9f2eb",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  selectingQuantity: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  selectingBtn: {
    marginHorizontal: 8,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 24,
    marginHorizontal: 4,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primaryGreen700,
  },
  buttonView: {
    height: 50,
    width: "100%",
    justifyContent: "center",
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
    justifyContent: "center",
  },
});
