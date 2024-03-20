import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card, Badge, Text as PaperText, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import GrayLine from "../components/common/text/GrayLine";
import Ellipsis from "../components/common/text/Ellipsis";
import ProdMoreInfo from "../components/common/list/ProdMoreInfo";
import SwiperSlide from "../components/ui/product/SwiperSlide";
import RatingStar from "../components/common/RatingStar";
import { Colors } from "../constants/colors";
import { PRODUCTS } from "../data/Data-Template";
import { BASE_URL } from "../api/config";
import { DefaultTheme } from "../themes/DefaultTheme";
import MainButton from "../components/common/button/MainButton";

function ProductDetailScreen({ route, navigation }) {
  const prodItemId = route.params.prodItemId;
  const [selectedProd, setSelectedProd] = useState(null);
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");

  const fetchProdItemData = async () => {
    await axios
      .get(BASE_URL + "/product-item/" + prodItemId)
      .then((res) => {
        let prodItemDetailInfo = res.data;
        setSelectedProd(prodItemDetailInfo.payload);
      })
      .catch((e) => {
        console.log("An error occurred while loading API-prodItemDetail: " + e);
        console.log("Message: " + e.response.status);
      });
  };

  useEffect(() => {
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
    // const fetchCartUser = API.get("/check-out-cart");

    setVisible(true);
    setSnackbarLabel("Đã thêm vào giỏ hàng");
  }

  return (
    <SafeAreaView style={[DefaultTheme.root, styles.container]}>
      {selectedProd ? (
        <>
          <ScrollView style={{ marginHorizontal: 10, marginBottom: 72 }}>
            <View style={styles.headerContainer}>
              <SwiperSlide prodItemId={selectedProd.id} />
              <View style={styles.headerContent}>
                <PaperText variant="titleLarge" style={{ fontWeight: "bold" }}>
                  {selectedProd.title}
                </PaperText>
                <PaperText variant="titleMedium" style={{ fontWeight: "700" }}>
                  {selectedProd.price} vnđ / {selectedProd.unit}
                </PaperText>
                <GrayLine />
                <PaperText variant="bodySmall">(4.5*)</PaperText>
                <RatingStar
                  disabled={true}
                  halfStarEnabled={true}
                  size={24}
                  ratingStar={4.5}
                />
                <PaperText variant="titleSmall">
                  {/* prodItem.sold */} Người đã mua
                </PaperText>
                <GrayLine />
                <PaperText variant="titleSmall">
                  Nguồn gốc: {selectedProd.productOrigin}
                </PaperText>
                <PaperText variant="titleSmall">
                  Ngày mở bán: {/* prodItem.openDate */}
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
              {/* <ProdMoreInfo data={prodItem.moreInfo} /> */}
            </View>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={() => {}}
            action={{
              label: "Xong",
              onPress: () => setVisible(false),
            }}
          >
            {snackbarLabel}
          </Snackbar>
          <View style={styles.safeAreaView}>
            <View style={styles.selectingQuantity}>
              <TouchableOpacity
                onPress={addCountHandler}
                style={styles.selectingBtn}
              >
                <Ionicons
                  name="add-circle"
                  size={32}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
              <Text style={styles.quantity}>{count}</Text>
              <TouchableOpacity
                onPress={minusCountHandler}
                style={styles.selectingBtn}
              >
                <Ionicons
                  name="remove-circle"
                  size={32}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <MainButton onPress={addingCartHandler}>Thêm vào giỏ</MainButton>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
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
    backgroundColor: Colors.primaryGreen100,
    borderRadius: 12,
  },
  descriptionContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: Colors.primaryGreen100,
    borderRadius: 12,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  safeAreaView: {
    backgroundColor: Colors.primaryGreen50,
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
    backgroundColor: Colors.primaryGreen200,
    borderWidth: 1,
    borderColor: Colors.primaryGreen700,
    borderRadius: 8,
  },
  selectingBtn: {
    marginHorizontal: 8,
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 28,
  },
  buttonView: {
    height: 50,
    width: "50%",
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
