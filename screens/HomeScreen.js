import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Card,
  Icon,
  IconButton,
  MD3Colors,
  Searchbar,
  Snackbar,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

import { windowWidth } from "../utils/Dimensions";
import { sliderNewsLetters } from "../themes/sliderNewsLetters";
import BannerNewsLettersSlider from "../components/BannerNewsLettersSlider";
import { Color } from "../constants/colors";

const RightContent = ({ onCartAdded, onToggleSnackBar }) => {
  return (
    <IconButton
      icon={onCartAdded ? "cart" : "cart-plus"}
      mode={onCartAdded ? "contained" : "outlined"}
      iconColor={Color.brandingSuccess}
      theme={{ colors: { outline: "green" } }}
      onPress={onToggleSnackBar}
    />
  );
};

function HomeScreen({ navigation }) {
  const [searchPrd, setSearchPrd] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);

  const renderNewsLettersBanner = ({ item, index }) => {
    return <BannerNewsLettersSlider data={item} />;
  };

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  const onToggleSnackBar = () => {
    setOnCartAdded(!onCartAdded);
  };
  const onDismissSnackBar = () => {
    setOnCartAdded(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Searchbar
        style={{ marginTop: 10, marginHorizontal: 20 }}
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

        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={sliderNewsLetters}
          renderItem={renderNewsLettersBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={320}
          loop={true}
        />

        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              marginVertical: 15,
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
          <ScrollView horizontal={true}>
            {/* Add FlatList */}
            <TouchableOpacity
              onPress={() => navigation.navigate("CategoryDetail")}
            >
              <Card style={{ margin: 10, width: 170 }}>
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
                <Card.Content style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Rau, củ, quả
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View>
          <View>
            <Text style={styles.categoryTitle}>Sản phẩm khuyên dùng</Text>
          </View>
          {/* Add FlatList */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail")}
            >
              <Card style={{ margin: 10, width: 170 }}>
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{
                    uri: "https://media.istockphoto.com/id/1455758897/vi/anh/chanh-qu%C3%BDt-cam-cho-n%C4%83m-m%E1%BB%9Bi-c%E1%BB%A7a-trung-qu%E1%BB%91c.jpg?s=1024x1024&w=is&k=20&c=c-eLqYe80tUCos9x4gwb0oyNZmzjIYCF4TWiJ2Nsesk=",
                  }}
                />
                <Card.Title
                  title="Cam"
                  subtitle="Cam sấy Đà Lạt ngon ất ơ..."
                  right={() => (
                    <RightContent
                      onCartAdded={onCartAdded}
                      onToggleSnackBar={onToggleSnackBar}
                    />
                  )}
                />
              </Card>
            </TouchableOpacity>
            <Card style={{ margin: 10, width: 170 }}>
              <Card.Cover
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 10,
                }}
                source={{ uri: "https://picsum.photos/700" }}
              />
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                right={() => (
                  <RightContent
                    onCartAdded={onCartAdded}
                    onToggleSnackBar={onToggleSnackBar}
                  />
                )}
              />
            </Card>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Card style={{ margin: 10, width: 170 }}>
              <Card.Cover
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 10,
                }}
                source={{ uri: "https://picsum.photos/700" }}
              />
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                right={() => (
                  <RightContent
                    onCartAdded={onCartAdded}
                    onToggleSnackBar={onToggleSnackBar}
                  />
                )}
              />
            </Card>
            <Card style={{ margin: 10, width: 170 }}>
              <Card.Cover
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 10,
                }}
                source={{ uri: "https://picsum.photos/700" }}
              />
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                right={() => (
                  <RightContent
                    onCartAdded={onCartAdded}
                    onToggleSnackBar={onToggleSnackBar}
                  />
                )}
              />
            </Card>
          </View>
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
  },
  scrollContainer: {
    marginVertical: 10,
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
