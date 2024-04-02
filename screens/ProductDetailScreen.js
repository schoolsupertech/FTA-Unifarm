import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
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
import ProdMoreInfo from "../components/common/list/ProdMoreInfo";
import SwiperSlide from "../components/ui/product/SwiperSlide";
import MainButton from "../components/common/button/MainButton";
import createAxios from "../utils/AxiosUtility";
import currencyFormat from "../utils/CurrencyFormat";
import { addToCart, updateCart } from "../context/redux/actions/cartActions";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function ProductDetailScreen({
  route,
  navigation,
  cart,
  addToCart,
  updateCart,
}) {
  const prodItemId = route.params.prodItemId;
  const [selectedProd, setSelectedProd] = useState(null);
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const { authState } = useContext(AuthContext);

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
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginEnd: 16 }}
              onPress={() => {
                navigation.navigate("CartScreen");
              }}
            >
              <Ionicons
                name="cart-outline"
                color={Colors.primaryGreen700}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginEnd: 4 }}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons
                name="notifications"
                color={Colors.primaryGreen700}
                size={24}
              />
              <Badge style={{ position: "absolute", top: -6, right: -12 }}>
                3
              </Badge>
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [selectedProd, navigation]);

  function addCountHandler() {
    if (count < 10) {
      setCount(count + 1);
    }
  }

  function minusCountHandler() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function addingCartHandler() {
    if (authState?.authenticated) {
      cart.items.map((item) => {
        console.log("Adding cart item: " + JSON.stringify(item));
        item.id === selectedProd.id
          ? updateCart({
              id: selectedProd.id,
              qty: item.qty + count,
            })
          : addToCart({
              id: selectedProd.id,
              qty: count,
            });
      });
      setVisible(true);
      setSnackbarLabel("Đã thêm vào giỏ hàng");
    } else {
      Alert.alert("Bạn cần phải đăng nhập trước", [{ text: "OK" }]);
      navigation.navigate("Profile");
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
                    variant="titleMedium"
                    style={{ fontWeight: "500" }}
                  >
                    {currencyFormat(selectedProd.price)} / {selectedProd.unit}
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
                <PaperText
                  variant="bodyMedium"
                  style={{ alignSelf: "flex-end" }}
                >
                  {/* prodItem.sold */} 99 đã bán
                </PaperText>
                <GrayLine />
                <PaperText variant="titleSmall">
                  Nguồn gốc: {selectedProd.productOrigin}
                </PaperText>
                <PaperText variant="titleSmall" style={{ marginTop: 4 }}>
                  Ngày mở bán: 01/12/2024{/* prodItem.openDate */}
                </PaperText>
              </View>
            </View>
            {/* Phần mô tả */}
            <View style={styles.descriptionContainer}>
              <PaperText
                variant="headlineSmall"
                style={styles.descriptionHeader}
              >
                Mô Tả
              </PaperText>
              <Ellipsis
                description={selectedProd.description}
                numberOfLines={3}
              />
            </View>
            {/* Phần thông tin thêm */}
            <View style={styles.descriptionContainer}>
              <PaperText
                variant="headlineSmall"
                style={styles.descriptionHeader}
              >
                Thông Tin Sản Phẩm
              </PaperText>
              <ProdMoreInfo
                data={[
                  "Độ tươi: 100%",
                  "Chế độ nấu: luộc, chiên, hấp, xào,…",
                  "Kiểu chế biến: gọt vỏ, rửa bằng nước muối, cắt lát hoặc cắt miếng to, có thể cho vào máy say,...",
                  "Ngày hết hạn: 23/04/2099",
                  "Hướng dẫn sử dụng: dùng ngay || phải thông qua kiểu chế biến và chế độ nấu phù hợp, để đạt được độ ngon nhất của món ăn phải nêm thêm các gia vị cần thiết, lưu ý bảo quản thực phẩm trong tủ lạnh,...",
                ]}
              />
            </View>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={() => {}}
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

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  updateCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);

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
  },
});
