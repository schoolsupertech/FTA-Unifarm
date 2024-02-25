import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import GrayLine from "../components/common/text/GrayLine";
import Ellipsis from "../components/common/text/Ellipsis";
import Thumbnail from "../components/ui/product/Thumbnail";
import ProdMoreInfo from "../components/common/list/DataTable";
import { Color } from "../constants/colors";
import { PRODUCTS } from "../data/Data-Template";
import { DefaultTheme } from "../themes/DefaultTheme";

function ProductDetailScreen({ route, navigation }) {
  const prodId = route.params.prodId;
  const selectedProd = PRODUCTS.find((prod) => prod.id === prodId);
  const [coverImage, setCoverImage] = useState(selectedProd.gallery[0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedProd.title,
    });
  }, [selectedProd, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginHorizontal: 10 }}>
        <Card
          style={{ marginTop: 8, backgroundColor: DefaultTheme.cardBgColor }}
        >
          <Card.Cover
            style={{ margin: 8 }}
            source={{
              uri: coverImage,
            }}
            resizeMode="cover"
          />
          <View style={styles.thumbnailContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Thumbnail
                gallery={selectedProd.gallery}
                onPickedImage={(image) => setCoverImage(image)}
              />
            </ScrollView>
          </View>
          <Card.Content>
            <PaperText variant="titleLarge" style={{ fontWeight: "bold" }}>
              {selectedProd.title}
            </PaperText>
            <GrayLine />
            <PaperText variant="titleSmall">
              {selectedProd.sold} Người đã mua
            </PaperText>
            <PaperText variant="titleSmall">
              Nguồn gốc: {selectedProd.source}
            </PaperText>
            <PaperText variant="titleSmall">
              Ngày mở bán: {selectedProd.openDate}
            </PaperText>
          </Card.Content>
        </Card>
        {/* Phần mô tả */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineMedium">Description</PaperText>
          <Ellipsis description={selectedProd.description} numberOfLines={3} />
        </View>
        {/* Phần thông tin thêm */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineMedium">More Information</PaperText>
          <ProdMoreInfo data={selectedProd.moreInfo} />
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
            {selectedProd.price}
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
  descriptionContainer: {
    marginTop: 8,
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
