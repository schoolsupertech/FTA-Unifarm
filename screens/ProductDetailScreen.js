import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import GrayLine from "../components/GrayLine";
import Ellipsis from "../components/Ellipsis";
import ImageThumbnail from "../components/list/ImageThumbnail";
import { Color } from "../constants/colors";
import { IMAGEDATA } from "../constants/imageData";

function ProductDetailScreen() {
  const defaultDescription =
    "Trái, rau, củ, quả đều có hết ở đây. Bọn bây vào mua ủng hộ cho tao đi... Đừng có ích kỉ như thế, mua giúp tao một tý là giúp tao sống tốt hơn, có tiền làm việc tốt đó mấy ba. Giờ tụi bây không mua thì tao lấy gì giúp ích cho xã hội này phát triển? Mua giúp đi chứ ở nhà tao còn gia đình, vợ con tao nữa huhu.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
        <Card
          style={{ margin: 8 }}
          theme={{ colors: { surfaceVariant: Color.primaryGreen50 } }}
        >
          <Card.Cover
            style={{ margin: 4 }}
            source={{
              uri: "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            resizeMode="cover"
          />
          <Card.Content
            style={{
              padding: 16,
              paddingBottom: 0,
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <ImageThumbnail images={IMAGEDATA} />
          </Card.Content>
          {/*
            <TouchableOpacity
              onPress={() => console.log("Thumbnail pressed, show full image")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1706001858535-2d782a8f3137?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
            */}
          <Card.Title
            title="Spinaches"
            titleVariant="titleLarge"
            subtitle="This is subtitle for spinaches"
          />
        </Card>
        <GrayLine />
        {/* Phần mô tả */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineMedium">Description</PaperText>
          <Ellipsis description={defaultDescription} numberOfLines={3} />
        </View>
        {/* Phần thông tin thêm */}
        <View style={styles.descriptionContainer}>
          <PaperText variant="headlineMedium">More Information</PaperText>
          <Ellipsis description={defaultDescription} numberOfLines={2} />
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
            8.000 VNĐ
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
  descriptionContainer: {},
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
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 8,
  },
});
