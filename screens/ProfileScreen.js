import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/Colors";
import { DefaultTheme } from "../themes/DefaultTheme";
// import createAxios from "../utils/axiosUtility";

function ProfileScreen() {
  const navigation = useNavigation();
  const [userDetail, setUserDetail] = useState();

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <LinearGradient
        style={styles.innerContainer}
        colors={["white", Colors.primaryGreen900]}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.textInnerContainer}>Hồ sơ</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginHorizontal: 5 }}
            onPress={() => navigation.navigate("Order")}
          >
            <MaterialCommunityIcons
              name="book-check-outline"
              size={27}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() => navigation.navigate("Cart")}
          >
            <FontAwesome name="shopping-basket" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{ height: 100 }}>
        <View
          style={{ backgroundColor: Colors.primaryGreen50, height: 50 }}
        ></View>
        <View style={{ height: 50 }}></View>
        <Image
          source={require("../assets/images/product3.png")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.displayUserName}>
        <Text style={styles.textDisplay}>Welcome back</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: 10 }}
      >
        <View style={{ height: 300 }}>
          <View style={styles.scrollHeader}>
            <Text style={styles.textScrollHeader}>Đơn hàng của bạn</Text>
            <Text style={styles.textScrollHeader1}>Xem tất cả</Text>
          </View>

          <View style={{ marginHorizontal: 50, flex: 1 }}>
            <View style={styles.scrollViewContent}>
              <View>
                <FontAwesome5 name="people-carry" size={30} color="black" />
                <Text style={{ fontSize: 11 }}>Chờ vận{"\n"}chuyển</Text>
              </View>
              <View>
                <FontAwesome5 name="shipping-fast" size={30} color="black" />
                <Text style={{ margin: 11 }}>Đang vận{"\n"}chuyển</Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="book-check-outline"
                  size={30}
                  color="black"
                />
                <Text style={{ fontSize: 11 }}>Đã nhận{"\n"}hàng</Text>
              </View>
              <View>
                <Fontisto
                  name="spinner-rotate-forward"
                  size={30}
                  color="black"
                />
                <Text style={{ fontSize: 11 }}>Đổi trả{"\n"}hàng</Text>
              </View>
            </View>

            <View>
              <View style={[styles.scrollViewContent, { marginTop: 20 }]}>
                <View style={styles.scrollViewDetail}>
                  <View>
                    <Entypo name="heart-outlined" size={26} color="black" />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text>Yêu Thích</Text>
                  </View>
                </View>
                <View style={{ opacity: 0.5 }}>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>

              <View style={[styles.scrollViewContent, { marginTop: 20 }]}>
                <View style={styles.scrollViewDetail}>
                  <View>
                    <AntDesign name="book" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text>Đơn mua</Text>
                  </View>
                </View>
                <View style={{ opacity: 0.5 }}>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>

              <View style={[styles.scrollViewContent, { marginTop: 20 }]}>
                <View style={styles.scrollViewDetail}>
                  <View>
                    <Feather name="star" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 0.5 }}>
                    <Text>Đánh giá</Text>
                  </View>
                </View>
                <View style={{ opacity: 0.5 }}>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>

              <View style={[styles.scrollViewContent, { marginTop: 20 }]}>
                <View style={styles.scrollViewDetail}>
                  <View>
                    <MaterialCommunityIcons
                      name="history"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text>Lịch sử mua hàng</Text>
                  </View>
                </View>
                <View style={{ opacity: 0.5 }}>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>

              <View style={[styles.scrollViewContent, { marginTop: 20 }]}>
                <View style={styles.scrollViewDetail}>
                  <View>
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text>Voucher</Text>
                  </View>
                </View>
                <View style={{ opacity: 0.5 }}>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Pressable onPress={() => {}} style={styles.logoutBtn}>
          <Text style={styles.textDisplay}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 0.14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInnerContainer: {
    marginLeft: 10,
    fontSize: 18,
    color: "black",
    fontWeight: 400,
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    marginTop: -75,
    borderRadius: 70,
  },
  displayUserName: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  textDisplay: {
    color: Colors.primaryGreen700,
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  scrollHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginVertical: 10,
  },
  textScrollHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textScrollHeader1: {
    fontSize: 16,
    fontWeight: 300,
    fontStyle: "italic",
  },
  scrollViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollViewDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewDetail1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewContent: {
    width: 185,
    backgroundColor: Colors.primaryGreen50,
    justifyContent: "space-around",
    marginBottom: 8,
  },
  imageView: {
    width: 162,
    height: 124,
    alignSelf: "center",
    marginTop: 10,
  },
  textView: {
    marginLeft: 5,
    marginBottom: 20,
  },
  textSold: {
    fontSize: 12,
    fontWeight: 200,
  },
  textProductName: {
    fontSize: 16,
    fontWeight: 500,
  },
});
