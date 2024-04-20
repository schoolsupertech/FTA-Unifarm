import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

import BannerNewsLettersSlider from "../components/ui/home/BannerNewsLettersSlider";
import TopHeader from "../components/common/headers/TopHeader";
import TopHeaderLogin from "../components/common/headers/TopHeaderLogin";
import LocationOptions from "../components/ui/home/LocationOptions";
import PopularCategories from "../components/common/list/PopularCategories";
import HeaderContent from "../components/common/HeaderContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { windowWidth } from "../utils/Dimensions";
import { SLIDERNEWSLETTERS } from "../data/sliderNewsLetters";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();
const FORMAT = createFormatUtil();

function HomeScreen() {
  const navigation = useNavigation();
  const { authState, userInfo, getLocation } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState({
    isVisible: false,
    status: null,
  });
  const [categoriesRecommendsInfo, setCategoriesRecommendsInfo] =
    useState(null);
  const [prodItemsInfo, setProdItemsInfo] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchCatData = async () => {
      const catRecomResponse = await API.get("/categories-recommends");
      setCategoriesRecommendsInfo(
        catRecomResponse.payload.filter(
          (category) => category.displayIndex <= 5,
        ),
      );
    };

    const fetchProdData = async () => {
      const prodItemsInfoResponse = await API.get(
        "/product-items/all-in-businessday",
      );
      // const isDuplicate = prodItemsInfo.some(
      //   (items) =>
      //     items.id === prodItemsInfoResponse.payload.map((prodId) => prodId.id),
      // );

      // !isDuplicate &&
      setProdItemsInfo(prodItemsInfoResponse.payload);
    };

    fetchCatData();
    fetchProdData();
  }, []);

  useEffect(() => {
    const fetchingUserLocation = async () => {
      const response = await getLocation(authState?.token);

      if (
        response &&
        response.statusCode >= 400 &&
        response.statusCode <= 500
      ) {
        Alert.alert(
          "Lần đầu đăng nhập?",
          "Bạn cần phải chọn vị trí của bạn để chúng tôi giao hàng cho bạn.",
          [{ text: "OK" }],
        );
        setLocationModalVisible({
          ...locationModalVisible,
          isVisible: true,
          status: response.response?.status,
        });
      } else {
        response.payload?.map(
          (item) => item.isDefault && setCurrentLocation(item),
        );
      }
    };

    fetchingUserLocation();
  }, []);

  const renderNewsLettersBanner = ({ item, index }) => (
    <BannerNewsLettersSlider key={index} data={item} />
  );

  async function updateLocationHandler(apartmentData, stationData, isDefault) {
    if (apartmentData && stationData) {
      const response = await API.customRequest(
        "/post",
        "/apartment-station/upsert",
        {
          stationId: stationData.id,
          apartmentId: apartmentData.id,
          isDefault: isDefault,
        },
        authState?.token,
      );
      console.log("Save location: " + JSON.stringify(response, null, 2));
      if (response) {
        Alert.alert("Cập nhật vị trí thành công", [
          {
            text: "OK",
          },
        ]);
        setLocationModalVisible({
          ...locationModalVisible,
          isVisible: false,
          status: null,
        });
      }
    } else {
      Alert.alert("Xin quý khách hãy nhập đầy đủ thông tin", [
        {
          text: "OK",
        },
      ]);
    }
  }

  function onCancelUpdateLocationHandler() {
    if (locationModalVisible.status === 400) {
      Alert.alert(
        "Quý khách chưa chọn địa điểm",
        "Quý khách chắc chắn muốn thoát?",
        [
          {
            text: "Có",
            style: "cancel",
            onPress: () =>
              setLocationModalVisible({
                ...locationModalVisible,
                isVisible: false,
                status: null,
              }),
          },
          {
            text: "Huỷ bỏ",
          },
        ],
      );
    } else {
      setLocationModalVisible({
        ...locationModalVisible,
        isVisible: false,
        status: null,
      });
    }
  }

  function RenderPopularCategories({ catItem }) {
    function selectedCategoryHandler() {
      navigation.navigate("CatListProdScreen", {
        catRecomId: catItem.id,
        catRecomName: catItem.name,
      });
    }

    return (
      <PopularCategories
        title={catItem.name}
        image={catItem.image}
        onPress={selectedCategoryHandler}
      />
    );
  }

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

  function selectedCategoriesStack() {
    navigation.navigate("CategoryTab");
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

          {authState?.authenticated && (
            <>
              <TouchableOpacity
                onPress={() =>
                  authState?.authenticated &&
                  setLocationModalVisible({
                    ...locationModalVisible,
                    isVisible: true,
                    status: 0,
                  })
                }
                style={styles.headerContent}
              >
                <Ionicons
                  name="location"
                  size={20}
                  color={Colors.primaryGreen800}
                />
                <Text style={styles.headerText}>
                  {currentLocation
                    ? currentLocation?.station?.name
                    : "Lần đầu đăng nhập? Chọn vị trí giao hàng..."}{" "}
                </Text>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={16}
                  color={Colors.primaryGreen800}
                />
              </TouchableOpacity>
              <LocationOptions
                visible={locationModalVisible}
                onPress={updateLocationHandler}
                onCancel={onCancelUpdateLocationHandler}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("TodayScreen")}
            style={styles.headerContent}
          >
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
        </ImageBackground>
      </LinearGradient>

      <ScrollView
        style={DefaultTheme.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentView}>
          <View style={{ marginBottom: 8 }}>
            <HeaderContent>Tin tức mới</HeaderContent>
          </View>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={SLIDERNEWSLETTERS}
            renderItem={renderNewsLettersBanner}
            sliderWidth={windowWidth - 40}
            itemWidth={320}
            loop={true}
          />
        </View>

        {/* Danh mục */}
        <View style={styles.contentView}>
          <HeaderContent
            onPress={selectedCategoriesStack}
            label={"Xem tất cả"}
            icon={true}
          >
            Danh mục phổ biến
          </HeaderContent>
          {categoriesRecommendsInfo && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {categoriesRecommendsInfo.map((item) => (
                <RenderPopularCategories key={item.id} catItem={item} />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.contentView}>
          <View style={{ marginBottom: 8 }}>
            <HeaderContent>Sản phẩm khuyên dùng</HeaderContent>
          </View>
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

export default HomeScreen;

const styles = StyleSheet.create({
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
  headerLocationContent: {
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: Colors.primaryGreen800,
  },
  headerMenu: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  contentView: {
    marginTop: 18,
    marginHorizontal: 12,
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
