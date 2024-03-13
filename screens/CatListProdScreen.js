import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, Searchbar, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ChipContent from "../components/ui/categories/ChipContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import { CHIPCATEGORYCONTENT } from "../constants/chipCategoryContent";
import { CATEGORIES, PRODUCTS } from "../data/Data-Template";
import { DefaultTheme } from "../themes/DefaultTheme";
import axios from "axios";
import { BASE_URL } from "../api/config";

function CatListProdScreen({ route }) {
  const navigation = useNavigation();
  const catRecomId = route.params.catRecomId;
  const [prodsInfo, setProdsInfo] = useState(null);
  const [selectedChips, setSelectedChips] = useState(null);
  const [prodItemsInfo, setProdItemsInfo] = useState([]);
  const [onCartAdded, setOnCartAdded] = useState(false);

  console.log("Product Items Info: " + JSON.stringify(prodItemsInfo));

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/category/" + catRecomId + "/products",
        );
        let prodsInfo = await res.data;
        setProdsInfo([CHIPCATEGORYCONTENT, ...prodsInfo.payload]);
      } catch (e) {
        console.log(
          "An error occurred while loading API-category/{id}/products: " + e,
        );
        console.log("Message: " + e.response.message);
      }
    };

    fetchProds();
  }, []);

  useEffect(() => {
    const fetchListProdItems = async (prodItemsId) => {
      await axios
        .get(BASE_URL + "/product/" + prodItemsId + "/product-items")
        .then((res) => {
          let getProdItemsInfo = res.data;
          setProdItemsInfo((oldItemsInfo) => [
            ...oldItemsInfo,
            ...getProdItemsInfo.payload,
          ]);
          console.log(
            "fetchListProdItems: " + JSON.stringify(getProdItemsInfo.payload),
          );
        })
        .catch((e) => {
          console.log(
            "An error occurred while loading API-product/{id}/product-items: " +
              e,
          );
          console.log("Message: " + e.response.message);
        });
    };

    if (
      selectedChips &&
      selectedChips.length === CHIPCATEGORYCONTENT.id &&
      selectedChips.includes(CHIPCATEGORYCONTENT.id)
    ) {
      console.log("Selected Chips if: " + JSON.stringify(selectedChips));
      prodItemsInfo.length && setProdItemsInfo([]);
      prodsInfo &&
        prodsInfo
          .filter(
            (ignoreDefault) => ignoreDefault.id !== CHIPCATEGORYCONTENT.id,
          )
          .map((prodItems) => {
            console.log("prodItems: " + JSON.stringify(prodItems.id));
            fetchListProdItems(prodItems.id);
          });
    } else if (
      selectedChips &&
      selectedChips.length &&
      !selectedChips.includes(CHIPCATEGORYCONTENT.id)
    ) {
      console.log("Selected Chips Length: " + selectedChips.length);
      console.log("Selected Chips else if: " + JSON.stringify(selectedChips));
      prodItemsInfo.length && setProdItemsInfo([]);
      selectedChips.map((chip) => {
        console.log("Chip: " + JSON.stringify(chip));
        fetchListProdItems(chip);
      });
    } else {
      console.log("Selected Chips else: " + JSON.stringify(selectedChips));
      setProdItemsInfo([]);
    }
  }, [selectedChips]);

  useLayoutEffect(() => {
    axios
      .get(BASE_URL + "/category/" + catRecomId)
      .then((res) => {
        let catRecomDetail = res.data;
        navigation.setOptions({
          title: catRecomDetail.payload.name,
          // headerSearchBarOptions: {
          //   onChangeText: (event) => console.log(event.nativeEvent.text),
          //   onSearchButtonPress: (event) =>
          //     console.log("Search", event.nativeEvent),
          // },
        });
      })
      .catch((e) => {
        console.log("An error occurred while loading API-category/{id}: " + e);
        console.log("Message: " + e.response.status);
      });
  }, [catRecomId, navigation]);

  // useEffect(() => {
  //   const unsubcribe = navigation.getParent().addListener("tabPress", (e) => {
  //     e.preventDefault();
  //     navigation.navigate("CategoriesStack");
  //   });
  //
  //   return unsubcribe;
  // }, []);

  function chipSelectedHandler(id) {
    setSelectedChips(id);
    // id.map((item) => {
    //   if (item !== CHIPCATEGORYCONTENT.id) {
    //     fetchListProdItems(item);
    //   }
    // });
  }

  function renderProdItem(itemData) {
    const item = itemData.item;
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

    function addingCartHandler(cartAdded) {
      setOnCartAdded(cartAdded);
    }

    return <CardProdItem {...prodItemProps} onAddingCart={addingCartHandler} />;
  }

  function onToggleSnackBar() {
    setOnCartAdded(!onCartAdded);
  }

  function onDismissSnackBar() {
    setOnCartAdded(false);
  }

  return (
    <SafeAreaView style={DefaultTheme.flex_1}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Tìm kiếm sản phẩm trong danh mục"
        elevation={3}
        theme={DefaultTheme.searchbar}
      />
      <View style={styles.chipContainer}>
        {/* Filter by Product Type */}
        {prodsInfo && (
          <ChipContent
            chipData={prodsInfo}
            onChipSelected={chipSelectedHandler}
          />
        )}
      </View>
      {/* List Sản Phẩm */}
      <View style={styles.prodItemContainer}>
        {prodItemsInfo && prodItemsInfo.length ? (
          <FlatList
            data={prodItemsInfo}
            keyExtractor={(item) => item.id}
            renderItem={renderProdItem}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </View>
      <Snackbar
        visible={onCartAdded}
        onDismiss={onDismissSnackBar}
        action={{ label: "Xong", onPress: () => {} }}
      >
        Đã thêm vào giỏ hàng
      </Snackbar>
    </SafeAreaView>
  );
}

export default CatListProdScreen;

const styles = StyleSheet.create({
  prodItemContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchbar: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  chipContainer: {
    marginHorizontal: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
