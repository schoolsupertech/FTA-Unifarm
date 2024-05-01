import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import TopHeader from "../components/common/headers/TopHeader";
import TopHeaderLogin from "../components/common/headers/TopHeaderLogin";
import CardProdItem from "../components/ui/home/CardProdItem";
import Calendar from "../components/common/list/Calendar";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();
const FORMAT = createFormatUtil();

function TodayScreen() {
  const navigation = useNavigation();
  const { authState, userInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState({
    isVisible: false,
    status: null,
  });
  const [prodItemsInfo, setProdItemsInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const prodItemsInfoResponse = await API.get(
        "/product-items/all-in-businessday",
      );

      // const isDuplicate = prodItemsInfo.some(
      //   (items) =>
      //     items.id ===
      //     prodItemsInfoResponse.payload.map((prodId) => prodId.id),
      // );

      // !isDuplicate &&
      // setProdItemsInfo((oldProdItemsInfo) => [
      //   ...oldProdItemsInfo,
      //   ...prodItemsInfoResponse.payload,
      // ]);
      prodItemsInfoResponse && setProdItemsInfo(prodItemsInfoResponse.payload);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchingUserLocation = async () => {
      const response = await API.customRequest(
        "get",
        "/apartment-station",
        authState?.token,
      );

      if (response.response?.status == 400) {
        Alert.alert(
          "Lần đầu đăng nhập?",
          "Bạn cần phải chọn vị trí của bạn để chúng tôi giao hàng cho bạn.",
          [{ text: "OK" }],
        );
        setLocationModalVisible({
          ...locationModalVisible,
          isVisible: true,
          status: response.response.status,
        });
      }
    };

    fetchingUserLocation();
  }, []);

  function renderProdItem(item) {
    function AddingCartHandler(cartAdded) {
      if (authState?.authenticated) {
        setVisible(true);
        if (cartAdded) {
          setOnCartAdded(cartAdded);
          setSnackbarLabel("Đã thêm vào giỏ hàng");
        }
      } else {
        setVisible(true);
        setSnackbarLabel("Bạn cần phải đăng nhập trước");
      }
    }

    return (
      <CardProdItem key={item.id} {...item} onAddingCart={AddingCartHandler} />
    );
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <LinearGradient
        colors={["white", Colors.primaryGreen900]}
        style={DefaultTheme.linearGradient}
      >
        <ImageBackground
          source={require("../assets/images/backgrounds/Logo.png")}
          resizeMode="stretch"
          style={DefaultTheme.imgBg}
          imageStyle={DefaultTheme.bgImg}
        >
          {authState?.authenticated ? (
            <TopHeader
              userInfo={userInfo}
              onCartIconPress={() => navigation.navigate("CartScreen")}
              onNotiIconPress={() => {
                navigation.navigate("Notification");
              }}
            />
          ) : (
            <TopHeaderLogin
              onLoginPress={() => navigation.navigate("AuthScreen")}
            />
          )}

          <Searchbar
            placeholder="Tìm kiếm sản phẩm..."
            elevation={2}
            theme={DefaultTheme.searchbar}
            onFocus={() =>
              navigation.navigate("SearchScreen", {
                searchTerm: prodItemsInfo,
                isFocus: true,
              })
            }
          />

          <TouchableOpacity style={styles.headerContent}>
            <Ionicons
              name="calendar"
              size={20}
              color={Colors.primaryGreen800}
            />
            <Text style={styles.headerText}>
              {FORMAT.dateFormat(new Date())}{" "}
            </Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={16}
              color={Colors.primaryGreen800}
            />
          </TouchableOpacity>

          {/*
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
          */}
        </ImageBackground>
      </LinearGradient>

      <ScrollView style={DefaultTheme.scrollContainer}>
        {/* Danh sách sản phẩm */}
        <View style={styles.contentView}>
          {prodItemsInfo?.map((item) => renderProdItem(item))}
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
    </SafeAreaView>
  );
}

export default TodayScreen;

const styles = StyleSheet.create({
  // searchBar: {
  //   flexDirection: "row",
  //   borderColor: "#C6C6C6",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  // },
  linearGradient: {
    width: "100%",
    padding: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  headerContent: {
    width: "auto",
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(220, 255, 220, 0.75)",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.primaryGreen800,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: Colors.primaryGreen800,
  },
  headerLocationContent: {
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginTop: 18,
    // marginVertical: 8,
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryButtonViewAll: {
    color: "#0aada8",
    textDecorationLine: "underline",
  },
});
