import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import GrayLine from "../components/common/text/GrayLine";
import HeaderContent from "../components/common/HeaderContent";
import MainButton from "../components/common/button/MainButton";
import AuthStack from "../navigators/AuthStack";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import createAxios from "../utils/AxiosUtility";

const API = createAxios();

function ProfileScreen() {
  const navigation = useNavigation();
  const { authState, userInfo, logout } = useContext(AuthContext);

  if (authState?.authenticated) {
    return (
      <SafeAreaView style={[DefaultTheme.root, styles.container]}>
        <LinearGradient
          style={DefaultTheme.linearGradient}
          colors={["white", Colors.primaryGreen900]}
        >
          <View style={styles.headerContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textHeaderContainer}>Hồ sơ</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => {}}>
                <MaterialCommunityIcons
                  name="book-check-outline"
                  size={24}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginEnd: 4 }}
                onPress={() => navigation.navigate("CartScreen")}
              >
                <Ionicons name="bag" size={24} color={Colors.primaryGreen700} />
                <Badge style={{ position: "absolute", top: -8, right: -16 }}>
                  3
                </Badge>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 100 }}>
            <Image
              source={{
                uri:
                  userInfo?.photo !== undefined
                    ? userInfo.photo
                    : userInfo?.avatar !== undefined
                      ? userInfo?.avatar
                      : "https://media.istockphoto.com/id/1533794626/vi/anh/bi%E1%BB%83u-c%E1%BA%A3m-vui-m%E1%BB%ABng-%E1%BA%A3nh-minh-h%E1%BB%8Da.jpg?s=2048x2048&w=is&k=20&c=VRqbg2wcGBhmm3SdmhhIc-Si_PHM-5jKBfebhTRon3Q=",
              }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.displayUserName}>
            <Text style={styles.textDisplay}>
              {userInfo?.lastName} {userInfo?.firstName} -{" "}
              {userInfo?.phoneNumber}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            DefaultTheme.scrollContainer,
            DefaultTheme.flex_1,
            { width: "100%", paddingTop: 12 },
          ]}
        >
          <View style={styles.orderContainer}>
            <HeaderContent onPress={() => {}} label={"Xem tất cả"} icon={true}>
              Đơn hàng của bạn
            </HeaderContent>
            <GrayLine />

            <View style={styles.orderContent}>
              <View style={styles.orderViewContent}>
                <TouchableOpacity style={styles.orderView}>
                  <FontAwesome5 name="people-carry" size={30} color="gray" />
                  <Text style={styles.orderTextView}>Chờ vận{"\n"}chuyển</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderView}>
                  <FontAwesome5 name="shipping-fast" size={30} color="gray" />
                  <Text style={styles.orderTextView}>Đang vận{"\n"}chuyển</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderView}>
                  <MaterialCommunityIcons
                    name="book-check-outline"
                    size={30}
                    color="gray"
                  />
                  <Text style={styles.orderTextView}>Đã nhận{"\n"}hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderView}>
                  <Fontisto
                    name="spinner-rotate-forward"
                    size={30}
                    color="gray"
                  />
                  <Text style={styles.orderTextView}>Đổi trả{"\n"}hàng</Text>
                </TouchableOpacity>
              </View>

              <GrayLine />

              <View style={[styles.orderView, { width: "100%" }]}>
                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <AntDesign name="user" size={28} color="black" />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Thông tin của bạn</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <Ionicons name="pin-outline" size={28} color="black" />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Sổ địa chỉ</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <Entypo name="heart-outlined" size={28} color="black" />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Yêu Thích</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <AntDesign name="book" size={28} color="black" />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Đơn mua</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <Feather name="star" size={28} color="black" />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Đánh giá</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderLineViewContent}>
                  <View style={styles.orderInnerViewContent}>
                    <MaterialCommunityIcons
                      name="history"
                      size={28}
                      color="black"
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text>Lịch sử mua hàng</Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.gridItem}>
            <MainButton onPress={logout}>Đăng xuất</MainButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <AuthStack />;
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    marginTop: 4,
    marginBottom: 8,
  },
  textHeaderContainer: {
    marginLeft: 10,
    fontSize: 24,
    color: Colors.primaryGreen700,
    fontWeight: "bold",
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  textDisplay: {
    color: Colors.primaryGreen100,
    fontWeight: "bold",
    fontSize: 18,
  },
  orderContainer: {
    backgroundColor: Colors.primaryGreen50,
    width: "100%",
    flex: 1,
    padding: 20,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderContent: {
    flex: 1,
    width: "100%",
  },
  textScrollHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textScrollHeader1: {
    fontSize: 14,
    fontWeight: 200,
    fontStyle: "italic",
    color: "gray",
    textDecorationLine: "underline",
  },
  orderViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderLineViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    padding: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  orderView: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  orderTextView: {
    fontSize: 12,
    marginTop: 4,
  },
  orderInnerViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
  gridItem: {
    width: "50%",
    marginTop: 12,
    marginBottom: 28,
    alignSelf: "center",
    // -- Shadow for android --
    borderRadius: 8,
    elevation: 4,
    // -- Shadow for iOS --
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    // -- This hidden overflow is using for android_ripple --
    overflow: "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGreen700,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primaryGreen50,
  },
});
