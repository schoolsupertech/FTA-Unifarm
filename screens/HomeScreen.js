import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  IconButton,
  Searchbar,
  Snackbar,
  Text as PaperText,
  ProgressBar,
  Badge,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";

import BannerNewsLettersSlider from "../components/BannerNewsLettersSlider";
import LogoTitle from "../themes/LogoTitle";
import { windowWidth } from "../utils/Dimensions";
import { SLIDERNEWSLETTERS } from "../constants/sliderNewsLetters";
import { Color } from "../constants/colors";

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

  const renderNewsLettersBanner = ({ item, index }) => {
    return <BannerNewsLettersSlider data={item} />;
  };

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  function selectedCategoryDetail() {
    navigation.navigate("Home", {
      screen: "CategoryDetail",
      params: { title: "Rau, củ, quả" },
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
            <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => {}}>
              <Ionicons
                name="cart-outline"
                color={Color.primaryGreen700}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => {}}>
              <Ionicons
                name="notifications"
                color={Color.primaryGreen700}
                size={24}
              />
              <Badge style={{ position: "absolute", top: -6, right: -12 }}>
                3
              </Badge>
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

        <View style={{ marginVertical: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.categoryTitle}>Danh mục phổ biến</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{ color: "#0aada8", textDecorationLine: "underline" }}
              >
                Xem tất cả <Ionicons name="arrow-forward" />
              </Text>
            </TouchableOpacity>
          </View>
          {/* Danh mục */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* Add FlatList */}
            <TouchableOpacity onPress={selectedCategoryDetail}>
              <Card
                style={{ margin: 8, width: 170 }}
                theme={{ colors: { surfaceVariant: Color.primaryGreen50 } }}
              >
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{
                    uri: "https://media.istockphoto.com/id/1457113212/vi/anh/rau-h%E1%BB%AFu-c%C6%A1-xanh-v%C3%A0-n%E1%BB%81n-th%E1%BB%B1c-ph%E1%BA%A9m-l%C3%A1-s%E1%BA%ABm-m%C3%A0u-nh%C6%B0-m%E1%BB%99t-kh%C3%A1i-ni%E1%BB%87m-%C4%83n-u%E1%BB%91ng-l%C3%A0nh-m%E1%BA%A1nh.jpg?s=1024x1024&w=is&k=20&c=--eEOkZpG3Kx0SmYtH35v3fOAvYeZ2jNDnKPvvS3WEU=",
                  }}
                />
                <Card.Content
                  style={{
                    marginVertical: 4,
                    paddingHorizontal: 8,
                    paddingBottom: 8,
                    paddingTop: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Rau, củ, quả
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </ScrollView>
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
              style={{ marginHorizontal: 8 }}
              theme={{ colors: { surfaceVariant: Color.primaryGreen50 } }}
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
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
