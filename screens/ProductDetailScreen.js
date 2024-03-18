import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card, Badge, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import GrayLine from "../components/common/text/GrayLine";
import Ellipsis from "../components/common/text/Ellipsis";
import ProdMoreInfo from "../components/common/list/ProdMoreInfo";
import SwiperSlide from "../components/ui/product/SwiperSlide";
import RatingStar from "../components/common/RatingStar";
import { Colors } from "../constants/Colors";
import { PRODUCTS } from "../data/Data-Template";
import { BASE_URL } from "../api/config";
import { DefaultTheme } from "../themes/DefaultTheme";

function ProductDetailScreen({ route, navigation }) {
  const prodItemId = route.params.prodItemId;
  const [selectedProd, setSelectedProd] = useState(null);
  // const selectedProd = PRODUCTS.find((prod) => prod.id === prodId);
  // const [coverImage, setCoverImage] = useState(selectedProd.gallery[0]);

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
              style={{ marginEnd: 4 }}
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
              style={{ marginEnd: 20 }}
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
          <View style={styles.safeAreaView}>
            <View>
              <Text
                style={{
                  color: Colors.grayScaleGray400,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Total Price
              </Text>
              <Text
                style={{ color: Colors.primaryGreen700, fontWeight: "800" }}
              >
                {selectedProd.price}
              </Text>
            </View>
            <View style={styles.button}>
              <Text style={{ fontWeight: "800", color: "white" }}>
                Thêm vào giỏ
              </Text>
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
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 30,
    borderColor: "#e9f2eb",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    height: 50,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: Colors.primaryGreen700,
    borderColor: "#e9f2eb",
  },
  thumbnailContainer: {
    alignItems: "center",
    margin: 8,
  },
});
