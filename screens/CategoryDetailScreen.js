import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Searchbar,
  Text as PaperText,
  ProgressBar,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ChipContent from "../components/list/ChipContent";
import { Color } from "../constants/colors";
import { CHIPCATEGORYCONTENT } from "../constants/chipCategoryContent";

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

function CategoryDetailScreen({ route }) {
  const navigation = useNavigation();
  // const id = route.params.id;
  // const selectedId = [NAME_OF_DATA].find((data) => data.id === id);
  const [isChipSelected, setIsChipSelected] = useState(true);
  const [onCartAdded, setOnCartAdded] = useState(false);

  // Preload Icon
  function headerButtonPressHandler() {
    console.log("");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => console.log(event.nativeEvent.text),
        onSearchButtonPress: (event) =>
          console.log("Search", event.nativeEvent),
      },
    });
  }, [navigation, headerButtonPressHandler]);

  function selectedProductDetail() {
    navigation.navigate("Categories", {
      screen: "ProductDetail",
      params: { title: "Cam Đà Lạt" },
    });
  }

  function onToggleSnackBar() {
    setOnCartAdded(!onCartAdded);
  }

  function onDismissSnackBar() {
    setOnCartAdded(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        style={{ marginTop: 10, marginHorizontal: 20 }}
        placeholder="Tìm kiếm sản phẩm trong danh mục"
        elevation={3}
        theme={{
          colors: {
            elevation: { level3: Color.primaryGreen50 },
            primary: Color.primaryGreen800,
          },
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
          padding: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Filter by Product Type */}
        <ChipContent
          chipData={CHIPCATEGORYCONTENT}
          chipSelected={isChipSelected}
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                    width: 150,
                    height: 150,
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

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: 10,
  },
});
