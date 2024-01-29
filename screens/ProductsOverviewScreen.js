import React, { useLayoutEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ChipContent from "../components/list/ChipContent";
import ProdItem from "../components/list/ProdItem";
import { Color } from "../constants/colors";
import { CHIPCATEGORYCONTENT } from "../constants/chipCategoryContent";
import { CATEGORIES, PRODUCTS } from "../data/Data-Template";

function ProductsOverviewScreen({ route }) {
  const navigation = useNavigation();
  const catId = route.params.categoryId;
  const [isChipSelected, setIsChipSelected] = useState(true);
  const [onCartAdded, setOnCartAdded] = useState(false);

  const fetchProds = PRODUCTS.filter((prodItem) => {
    return prodItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const getCatTitle = CATEGORIES.find((cat) => {
      return cat.id === catId;
    }).title;

    navigation.setOptions({
      title: getCatTitle,
      headerSearchBarOptions: {
        onChangeText: (event) => console.log(event.nativeEvent.text),
        onSearchButtonPress: (event) =>
          console.log("Search", event.nativeEvent),
      },
    });
  }, [catId, navigation]);

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

    return <ProdItem {...prodItemProps} />;
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
      {/* List Sản Phẩm */}
      <View style={styles.prodItemContainer}>
        <FlatList
          data={fetchProds}
          keyExtractor={(item) => item.id}
          renderItem={renderProdItem}
        />
      </View>
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

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  prodItemContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
