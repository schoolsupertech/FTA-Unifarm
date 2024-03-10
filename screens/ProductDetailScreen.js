import React, { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import GrayLine from "../components/common/text/GrayLine";
import Ellipsis from "../components/common/text/Ellipsis";
import ProdMoreInfo from "../components/common/list/ProdMoreInfo";
import SwiperSlide from "../components/ui/product/SwiperSlide";
import RatingStar from "../components/common/RatingStar";
import { Color } from "../constants/colors";
import { PRODUCTS } from "../data/Data-Template";
import { AuthContext } from "../context/AuthContext";

function ProductDetailScreen({ route, navigation }) {
  const prodItem = {
    id: route.params.prodItemId,
    title: route.params.prodItemTitle,
    description: route.params.prodItemDescription,
    source: route.params.prodItemSource,
    outOfStock: route.params.prodItemOutOfStock,
    price: route.params.prodItemPrice,
    quantity: route.params.prodItemQuantity,
    unit: route.params.prodItemUnit,
  };
  // const selectedProd = prodItemDetail(prodId);
  // const selectedProd = PRODUCTS.find((prod) => prod.id === prodId);
  // const [coverImage, setCoverImage] = useState(selectedProd.gallery[0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: prodItem.title,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginHorizontal: 10, marginBottom: 72 }}>
        <View style={styles.headerContainer}>
          {prodItem && prodItem.id && <SwiperSlide prodItemId={prodItem.id} />}
          <View style={styles.headerContent}>
            <PaperText variant="titleLarge" style={{ fontWeight: "bold" }}>
              {prodItem.title}
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
              Nguồn gốc: {prodItem.source}
            </PaperText>
            <PaperText variant="titleSmall">
              Ngày mở bán: {/* prodItem.openDate */}
            </PaperText>
          </View>
        </View>
        {/* Phần mô tả */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineSmall" style={styles.descriptionHeader}>
            Mô Tả
          </PaperText>
          <Ellipsis description={prodItem.description} numberOfLines={3} />
        </View>
        {/* Phần thông tin thêm */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineSmall" style={styles.descriptionHeader}>
            Thông Tin Sản Phẩm
          </PaperText>
          {/* <ProdMoreInfo data={prodItem.moreInfo} /> */}
        </View>
      </ScrollView>
      <View style={styles.safeAreaView}>
        <View>
          <Text
            style={{
              color: Color.grayScaleGray400,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Total Price
          </Text>
          <Text style={{ color: Color.primaryGreen700, fontWeight: "800" }}>
            {prodItem.price}
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={{ fontWeight: "800", color: "white" }}>Mua Ngay</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {},
  headerContent: {
    padding: 16,
    backgroundColor: Color.primaryGreen100,
    borderRadius: 12,
  },
  descriptionContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: Color.primaryGreen100,
    borderRadius: 12,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  safeAreaView: {
    backgroundColor: Color.primaryGreen50,
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
    backgroundColor: Color.primaryGreen700,
    borderColor: "#e9f2eb",
  },
  thumbnailContainer: {
    alignItems: "center",
    margin: 8,
  },
});
