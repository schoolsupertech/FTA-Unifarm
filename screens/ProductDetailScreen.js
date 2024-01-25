import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Text } from "react-native-paper";

import GrayLine from "../components/GrayLine";
import Ellipsis from "../components/Ellipsis";
import { Color } from "../constants/colors";

function ProductDetailScreen() {
  const defaultDescription =
    "Trái, rau, củ, quả đều có hết ở đây. Bọn bây vào mua ủng hộ cho tao đi... Đừng có ích kỉ như thế, mua giúp tao một tý là giúp tao sống tốt hơn, có tiền làm việc tốt đó mấy ba. Giờ tụi bây không mua thì tao lấy gì giúp ích cho xã hội này phát triển? Mua giúp đi chứ ở nhà tao còn gia đình, vợ con tao nữa huhu.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, marginVertical: 10, marginHorizontal: 20 }}>
        <Card>
          <Card.Cover
            source={{
              uri: "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            resizeMode="cover"
          />
          <Card.Title
            title="Spinaches"
            subtitle="This is subtitle for spinaches"
          />
        </Card>
        <GrayLine />
        {/* Phần mô tả */}
        <View style={styles.descriptionContainer}>
          <Text variant="headlineMedium">Description</Text>
          <Ellipsis description={defaultDescription} numberOfLines={3} />
        </View>
        {/* Phần thông tin thêm */}
        <View style={styles.descriptionContainer}>
          <Text variant="headlineMedium">More Information</Text>
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
            100.000 VNĐ
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
  },
  descriptionContainer: {},
  safeAreaView: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
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
});
