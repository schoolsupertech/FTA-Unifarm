import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { ActivityIndicator, Searchbar, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ChipContent from "../components/ui/categories/ChipContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import createAxios from "../utils/AxiosUtility";
import { CHIPCATEGORYCONTENT } from "../constants/chipCategoryContent";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";

const API = createAxios();

function CatListProdScreen({ route }) {
  const navigation = useNavigation();
  const catRecomId = route.params.catRecomId;
  const catRecomName = route.params.catRecomName;
  const [prodsInfo, setProdsInfo] = useState(null);
  const [selectedChips, setSelectedChips] = useState(null);
  const [prodItemsInfo, setProdItemsInfo] = useState([]);
  const [onCartAdded, setOnCartAdded] = useState(false);

  useEffect(() => {
    const fetchProds = async () => {
      const response = await API.get("/category/" + catRecomId + "/products");
      setProdsInfo([CHIPCATEGORYCONTENT, ...response.payload]);
    };

    fetchProds();
  }, []);

  useEffect(() => {
    const fetchListProdItems = async (prodItemId) => {
      const response = await API.get(
        "/product/" + prodItemId + "/product-items",
      );
      setProdItemsInfo((oldItemsInfo) => [
        ...oldItemsInfo,
        ...response.payload,
      ]);
      // await axios
      //   .get(BASE_URL + "/product/" + prodItemsId + "/product-items")
      //   .then((res) => {
      //     let getProdItemsInfo = res.data;
      //     setProdItemsInfo((oldItemsInfo) => [
      //       ...oldItemsInfo,
      //       ...getProdItemsInfo.payload,
      //     ]);
      //     console.log(
      //       "fetchListProdItems: " + JSON.stringify(getProdItemsInfo.payload),
      //     );
      //   })
      //   .catch((e) => {
      //     console.log(
      //       "An error occurred while loading API-product/{id}/product-items: " +
      //         e,
      //     );
      //     console.log("Message: " + e.response.message);
      //   });
    };

    if (
      selectedChips &&
      selectedChips.length === CHIPCATEGORYCONTENT.id &&
      selectedChips.includes(CHIPCATEGORYCONTENT.id)
    ) {
      prodItemsInfo.length && setProdItemsInfo([]);
      prodsInfo &&
        prodsInfo
          .filter(
            (ignoreDefault) => ignoreDefault.id !== CHIPCATEGORYCONTENT.id,
          )
          .map((prodItems) => {
            fetchListProdItems(prodItems.id);
          });
    } else if (
      selectedChips &&
      selectedChips.length &&
      !selectedChips.includes(CHIPCATEGORYCONTENT.id)
    ) {
      prodItemsInfo.length && setProdItemsInfo([]);
      selectedChips.map((chip) => {
        fetchListProdItems(chip);
      });
    } else {
      setProdItemsInfo([]);
    }
  }, [selectedChips]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: catRecomName,
      // headerSearchBarOptions: {
      //   onChangeText: (event) => console.log(event.nativeEvent.text),
      //   onSearchButtonPress: (event) =>
      //     console.log("Search", event.nativeEvent),
      // },
    });
  }, [navigation]);

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
      {/*
      <Searchbar
        style={styles.searchbar}
        placeholder="Tìm kiếm sản phẩm..."
        elevation={3}
        theme={DefaultTheme.searchbar}
      />
      */}
      <View>
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={{
            backgroundColor: "white",
            paddingLeft: 65,
            fontSize: 15,
            fontWeight: "500",
            padding: 20,
          }}
          selectionColor={"green"}
          placeholderTextColor={"grey"}
          underlineColor="transparent"
        />
        <View style={{ position: "absolute", top: 15, left: 25 }}>
          <Ionicons name="search" size={24} color={"green"} />
        </View>
      </View>
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
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={Colors.primaryGreen700} />
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
    marginVertical: 12,
    marginHorizontal: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
