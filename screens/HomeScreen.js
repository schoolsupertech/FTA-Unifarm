import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Badge, IconButton, Searchbar, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

import BannerNewsLettersSlider from "../components/ui/home/BannerNewsLettersSlider";
import LocationOptions from "../components/ui/home/LocationOptions";
import PopularCategories from "../components/common/list/PopularCategories";
import HeaderContent from "../components/ui/home/HeaderContent";
import CardProdItem from "../components/ui/product/CardProdItem";
import LogoTitle from "../themes/LogoTitle";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Color } from "../constants/colors";
import { windowWidth } from "../utils/Dimensions";
import { SLIDERNEWSLETTERS } from "../data/sliderNewsLetters";
import { CATEGORIES, PRODUCTS } from "../data/Data-Template";

function HomeScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const renderNewsLettersBanner = ({ item, index }) => (
    <BannerNewsLettersSlider data={item} />
  );

  function updateLocationHandler(data) {
    setLocationModalVisible(false);
  }

  function renderPopularCategories(itemData) {
    function selectedCategoryHandler() {
      navigation.navigate("CatListProdScreen", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <PopularCategories
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={selectedCategoryHandler}
      />
    );
  }

  function renderProdItem(itemData) {
    const item = itemData.item;
    const prodItemProps = {
      id: item.id,
      title: item.title,
      sold: item.sold,
      openDate: item.openDate,
      source: item.source,
      description: item.description,
      moreInfo: item.moreInfo,
      price: item.price,
      listedPrice: item.listedPrice,
      unit: item.unit,
      gallery: item.gallery,
    };

    function AddingCartHandler(cartAdded) {
      setOnCartAdded(cartAdded);
    }

    return <CardProdItem {...prodItemProps} onAddingCart={AddingCartHandler} />;
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
        colors={["white", Color.primaryGreen900]}
        style={styles.linearGradient}
      >
        <View style={styles.headerContainer}>
          <LogoTitle />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginEnd: 20 }}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons
                name="notifications"
                color={Color.primaryGreen700}
                size={24}
              />
              <Badge style={{ position: "absolute", top: -6, right: -12 }}>
                3
              </Badge>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginEnd: 4 }}
              onPress={() => {
                navigation.navigate("CartScreen");
              }}
            >
              <Ionicons
                name="cart-outline"
                color={Color.primaryGreen700}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerLocation}>
          <View>
            <Text
              style={{
                color: Color.primaryGreen800,
              }}
            >
              Vị trí
            </Text>
            <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
              <Text style={styles.textLocation}>
                Thủ Đức, Tp. Hồ Chí Minh <Ionicons name="arrow-down" />
              </Text>
            </TouchableOpacity>
            <LocationOptions
              visible={locationModalVisible}
              onPress={updateLocationHandler}
              onCancel={() => setLocationModalVisible(false)}
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
          <View>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item.id}
              renderItem={renderPopularCategories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.contentView}>
          <HeaderContent>Sản phẩm khuyên dùng</HeaderContent>
          <View>
            <FlatList
              data={PRODUCTS}
              keyExtractor={(item) => item.id}
              renderItem={renderProdItem}
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={onCartAdded}
        onDismiss={() => {}}
        action={{
          label: "Xong",
          onPress: () => setOnCartAdded(false),
        }}
      >
        Đã thêm vào giỏ hàng
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
    color: Color.primaryGreen700,
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
    color: Color.primaryGreen100,
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
