import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

function HomeScreen() {
  return (
    <ScrollView style={styles.baseContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/banner-big.png")}
      />
      {/* Main View */}
      <View>
        {/* Tiêu đề mục */}
        <View>
          <Text>Danh mục phổ biến</Text>
        </View>
        {/* Danh mục */}
        <View>
          <Text>Danh muc</Text>
        </View>
        <View>
          <Text>Xem tất cả</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>Sản phẩm khuyên dùng</Text>
        </View>
        <View>
          <Text>Cac san pham</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    margin: 20,
  },
  image: {
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "100%",
    height: 200,
  },
});
