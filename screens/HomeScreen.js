import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Badge, IconButton, Searchbar, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

import BannerNewsLettersSlider from "../components/ui/home/BannerNewsLettersSlider";
import LocationOptions from "../components/ui/home/LocationOptions";
import PopularCategories from "../components/common/list/PopularCategories";
import HeaderContent from "../components/common/HeaderContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import LogoTitle from "../themes/LogoTitle";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { windowWidth } from "../utils/Dimensions";
import { SLIDERNEWSLETTERS } from "../data/sliderNewsLetters";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function HomeScreen() {
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);
  const [searchPrd, setSearchPrd] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState({
    isVisible: false,
    status: null,
  });
  const [categoriesRecommendsInfo, setCategoriesRecommendsInfo] =
    useState(null);
  const [prodItemsInfo, setProdItemsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchProdItems = async (prodItemId) => {
        const prodItemsInfoResponse = await API.get(
          "/product/" + prodItemId + "/product-items",
        );
        // const newProdItemsInfo = Object.fromEntries(
        //   Object.entries(prodItemsInfo),
        // );
        setProdItemsInfo((oldProdItemsInfo) => [
          ...oldProdItemsInfo,
          ...prodItemsInfoResponse.payload,
        ]);
      };

      const catRecomResponse = await API.get("/categories-recommends");
      setCategoriesRecommendsInfo(catRecomResponse.payload);

      let categoryRecomId = catRecomResponse.payload
        .filter((items) => items.name.toLowerCase().includes("nổi bật"))
        .map((item) => item.id);

      if (categoryRecomId) {
        const prodsInfoResponse = await API.get(
          "/category/" + categoryRecomId + "/products",
        );
        prodsInfoResponse.payload.map((item) => {
          fetchProdItems(item.id);
        });
      }
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

  function renderPopularCategories(item) {
    function selectedCategoryHandler() {
      navigation.navigate("CatListProdScreen", {
        catRecomId: item.id,
      });
    }

    return (
      <PopularCategories
        key={item.id}
        title={item.name}
        image={item.image}
        onPress={selectedCategoryHandler}
      />
    );
  }

  function renderProdItem(item) {
    const prodItemProps = {
      id: item.id,
      title: item.title,
      // sold: item.sold,
      // openDate: item.openDate,
      source: item.productOrigin,
      description: item.description,
      // moreInfo: item.moreInfo,
      price: item.price,
      // listedPrice: item.listedPrice,
      unit: item.unit,
      outOfStock: item.outOfStock,
      quantity: item.quantity,
      // gallery: item.gallery,
    };

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
      <CardProdItem
        key={prodItemsInfo.id}
        {...prodItemProps}
        onAddingCart={AddingCartHandler}
      />
    );
  }

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  function selectedCategoriesStack() {
    navigation.navigate("CategoryTab");
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <LinearGradient
        colors={["white", Colors.primaryGreen900]}
        style={styles.linearGradient}
      >
        <View style={styles.headerContainer}>
          <LogoTitle />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginEnd: 16 }}
              onPress={() => {
                authState?.authenticated
                  ? navigation.navigate("CartScreen")
                  : navigation.navigate("Profile");
              }}
            >
              <Ionicons
                name="bag-outline"
                color={Colors.primaryGreen700}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginEnd: 4 }}
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
        </View>
        <View style={styles.headerLocation}>
          <View>
            <Text
              style={{
                color: Colors.primaryGreen800,
              }}
            >
              Vị trí
            </Text>
            <TouchableOpacity
              onPress={() =>
                authState?.authenticated &&
                setLocationModalVisible({
                  ...locationModalVisible,
                  isVisible: true,
                  status: 0,
                })
              }
            >
              <Text style={styles.textLocation}>
                Thủ Đức, Tp. Hồ Chí Minh <Ionicons name="arrow-down" />
              </Text>
            </TouchableOpacity>
            <LocationOptions
              visible={locationModalVisible}
              onPress={updateLocationHandler}
              onCancel={onCancelUpdateLocationHandler}
            />
          </View>
          <View>
            <Text>Holder</Text>
          </View>
        </View>
        <Searchbar
          placeholder="Tìm kiếm sản phẩm"
          elevation={3}
          theme={DefaultTheme.searchbar}
          value={searchPrd}
          onChangeText={displaySearchPrdText}
          // onIconPress={() =>
          //   navigation.navigate("SearchScreen", { searchItem: searchPrd })
          // }
        />
        <View style={styles.headerMenu}>
          <View>
            <Text style={styles.textMenu}>Thực đơn:</Text>
          </View>
          <View>
            <Text style={styles.textMenu}>
              Hôm nay (ngày 26 tháng 01 năm 2024)
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={DefaultTheme.scrollContainer}>
        <View style={styles.contentView}>
          <HeaderContent>Tin tức mới</HeaderContent>
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
          {
            categoriesRecommendsInfo && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categoriesRecommendsInfo.map((item) =>
                  renderPopularCategories(item),
                )}
              </ScrollView>
            )
          }
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.contentView}>
          <HeaderContent>Sản phẩm khuyên dùng</HeaderContent>
          {
            prodItemsInfo?.map((item) => renderProdItem(item))
          }
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 8,
    height: 45,
  },
  headerLocation: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  textLocation: {
    color: Colors.primaryGreen700,
    textDecorationLine: "underline",
  },
  headerMenu: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 12,
  },
  textMenu: {
    color: Colors.primaryGreen100,
  },
  contentView: {
    marginTop: 8,
    // marginVertical: 8,
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
