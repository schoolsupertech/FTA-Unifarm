import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Badge,
  Text as PaperText,
  IconButton,
  Searchbar,
  Snackbar,
  ProgressBar,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

import BannerNewsLettersSlider from "../components/BannerNewsLettersSlider";
import PopularCategories from "../components/list/PopularCategories";
import LogoTitle from "../themes/LogoTitle";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Color } from "../constants/colors";
import { windowWidth } from "../utils/Dimensions";
import { SLIDERNEWSLETTERS } from "../data/sliderNewsLetters";
import { CATEGORIES } from "../data/Data-Template";

const RightContent = ({ onCartAdded, onToggleSnackBar }) => {
  return (
    <IconButton
      icon={onCartAdded ? "cart" : "cart-plus"}
      mode={onCartAdded ? "contained" : "outlined"}
      iconColor={Color.brandingSuccess100}
      theme={{ colors: { outline: "green" } }}
      onPress={onToggleSnackBar}
    />
  );
};

function HomeScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);

  const renderNewsLettersBanner = ({ item, index }) => (
    <BannerNewsLettersSlider data={item} />
  );

  function renderPopularCategories(itemData) {
    function selectedCategoryHandler() {
      navigation.navigate("Categories", {
        screen: "ProductsOverview",
        params: {
          categoryId: itemData.item.id,
        },
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

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  function selectedCategoriesStack() {
    navigation.navigate("Categories", {
      screen: "CategoriesStack",
    });
  }

  function selectedProductDetail() {
    navigation.navigate("Home", {
      screen: "ProductDetail",
      params: { title: "Chi tiết sản phẩm" },
    });
  }

  const onToggleSnackBar = () => {
    setOnCartAdded(!onCartAdded);
  };
  const onDismissSnackBar = () => {
    setOnCartAdded(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        colors={["white", Color.primaryGreen900]}
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
            marginBottom: 8,
            height: 45,
          }}
        >
          <LogoTitle />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => {}}>
              <Ionicons
                name="notifications"
                color={Color.primaryGreen700}
                size={24}
              />
              <Badge style={{ position: "absolute", top: -6, right: -12 }}>
                3
              </Badge>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginEnd: 4 }} onPress={() => {}}>
              <Ionicons
                name="cart-outline"
                color={Color.primaryGreen700}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <TouchableOpacity style={{ borderColor: "black", borderRadius: 1 }}>
            <View>
              <Text
                style={{
                  color: Color.primaryGreen800,
                }}
              >
                Vị trí
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: Color.primaryGreen700,
                  textDecorationLine: "underline",
                }}
              >
                Thủ Đức, Tp. Hồ Chí Minh <Ionicons name="arrow-down" />
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text>Holder</Text>
          </View>
        </View>
        <Searchbar
          placeholder="Tìm kiếm sản phẩm"
          elevation={3}
          theme={{
            colors: {
              elevation: { level3: Color.primaryGreen50 },
              primary: Color.primaryGreen800,
            },
          }}
          value={searchPrd}
          onChangeText={displaySearchPrdText}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <View style={{ borderColor: "black", borderRadius: 1 }}>
            <Text
              style={{
                color: Color.primaryGreen100,
              }}
            >
              Thực đơn:
            </Text>
          </View>
          <View style={{ borderRadius: 1, borderColor: "black" }}>
            <Text style={{ color: Color.primaryGreen100 }}>
              Hôm nay (ngày 26 tháng 01 năm 2024)
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContainer}>
        {/*
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search" />
        </View>
        */}

        <View style={{ marginTop: 8 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.categoryTitle}>Tin tức mới</Text>
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
        <View style={styles.categoryContainer}>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryTitle}>Danh mục phổ biến</Text>
            <TouchableOpacity onPress={selectedCategoriesStack}>
              <Text style={styles.categoryButtonViewAll}>
                Xem tất cả <Ionicons name="arrow-forward" />
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.categoryTitle}>Sản phẩm khuyên dùng</Text>
          </View>
          {/* Add FlatList */}
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={selectedProductDetail}
          >
            <Card
              style={{
                marginHorizontal: 8,
                backgroundColor: DefaultTheme.cardBgColor,
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                }}
              >
                <Card.Cover
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                  }}
                  source={{
                    uri: "https://media.istockphoto.com/id/1455758897/vi/anh/chanh-qu%C3%BDt-cam-cho-n%C4%83m-m%E1%BB%9Bi-c%E1%BB%A7a-trung-qu%E1%BB%91c.jpg?s=1024x1024&w=is&k=20&c=c-eLqYe80tUCos9x4gwb0oyNZmzjIYCF4TWiJ2Nsesk=",
                  }}
                />
                <Card.Content
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    paddingStart: 8,
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ marginVertical: 4 }}>
                      <PaperText variant="titleMedium" numberOfLines={2}>
                        Cam sấy Đà Lạt Ngon Ất Ơ ơ ơơơ
                      </PaperText>
                    </View>
                    <View style={{ marginVertical: 4, paddingHorizontal: 16 }}>
                      <PaperText variant="bodySmall">Đã bán 246</PaperText>
                      <ProgressBar progress={0.5} color={Color.brandingError} />
                    </View>
                  </View>
                  <Card.Title
                    style={{ justifyContent: "center" }}
                    title="8.000đ"
                    subtitle="11.000đ"
                    right={() => (
                      <RightContent
                        onCartAdded={onCartAdded}
                        onToggleSnackBar={onToggleSnackBar}
                      />
                    )}
                  />
                </Card.Content>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Snackbar
        visible={onCartAdded}
        onDismiss={onDismissSnackBar}
        style={{ padding: 0 }}
        action={{ label: "Xong", onPress: () => {} }}
      >
        Đã thêm vào giỏ hàng
      </Snackbar>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryContainer: {
    marginVertical: 8,
  },
  categoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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
