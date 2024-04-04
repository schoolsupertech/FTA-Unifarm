import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Divider, Searchbar, Picker } from "react-native-paper";

import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import CardProdItem from "../components/ui/home/CardProdItem";

const API = createAxios();

const SearchScreen = ({ navigation, route }) => {
  const searchbarRef = useRef(null);
  const [isFocus, setIsFocus] = useState(route.params.isFocus);
  const [isSearchingPrd, setIsSearchingPrd] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedProd, setSearchedProd] = useState(null);
  const [searchPrd, setSearchPrd] = useState(null);
  const [searchingProdItems, setSearchingProdItems] = useState(null);

  useEffect(() => {
    if (searchbarRef.current) {
      searchbarRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchSearchProdItems = async () => {
      const response = await API.get(
        "/product-items/search?SearchTerm=" + searchPrd.title,
      );
      response && setSearchedProd(response.payload);
    };

    if (searchPrd) {
      fetchSearchProdItems();
    }
  }, [searchPrd]);

  function onFocusHandler() {
    setIsFocus(true);
  }

  function onBlurHandler() {
    // setIsFocus(false);
    // !searchingProdItems.length && !isSearchingPrd && navigation.goBack();
  }

  async function onSearchingProdItemsHandler(value) {
    setIsSearchingPrd(true);
    setSearchValue(value);

    if (value) {
      const response = await API.get(
        "/product-items/search?SearchTerm=" + value,
      );
      if (Array.isArray(response.payload) && response.payload.length > 0) {
        setSearchingProdItems(response.payload);
      } else {
        setSearchingProdItems(null);
      }
    } else {
      setIsSearchingPrd(false);
      setIsFocus(false);
      navigation.goBack();
    }
  }

  function renderSearchingProdItems(item) {
    function onSelectSearchingProd() {
      setIsSearchingPrd(false);
      setSearchPrd(item);
    }

    return (
      <TouchableOpacity
        key={item.id}
        onPress={onSelectSearchingProd}
        style={styles.dropdownItem}
      >
        <View style={styles.dropdownSearching}>
          <Text style={styles.dropdownText} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
        <Divider />
      </TouchableOpacity>
    );
  }

  function onSubmitEditingHandler() {
    setSearchPrd(searchValue);
    setIsSearchingPrd(false);
  }

  function renderSearchProdItems(itemData) {
    const prodItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      // sold: item.sold,
      // openDate: item.openDate,
      source: itemData.item.productOrigin,
      description: itemData.item.description,
      // moreInfo: item.moreInfo,
      price: itemData.item.price,
      // listedPrice: item.listedPrice,
      unit: itemData.item.unit,
      outOfStock: itemData.item.outOfStock,
      quantity: itemData.item.quantity,
      // gallery: item.gallery,
    };

    // function AddingCartHandler(cartAdded) {
    //   if (authState?.authenticated) {
    //     setVisible(true);
    //     if (cartAdded) {
    //       setOnCartAdded(cartAdded);
    //       setSnackbarLabel("Đã thêm vào giỏ hàng");
    //     }
    //   } else {
    //     setVisible(true);
    //     setSnackbarLabel("Bạn cần phải đăng nhập trước");
    //   }
    // }

    return (
      <CardProdItem
        key={prodItemProps.id}
        {...prodItemProps}
        // onAddingCart={AddingCartHandler}
      />
    );
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <View style={DefaultTheme.linearGradient}>
        <Searchbar
          elevation={2}
          theme={DefaultTheme.searchbar}
          placeholder="Tìm kiếm sản phẩm..."
          ref={searchbarRef}
          onSubmitEditing={onSubmitEditingHandler}
          onChangeText={onSearchingProdItemsHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        {isSearchingPrd && (
          <View style={styles.dropdownContainer}>
            {Array.isArray(searchingProdItems) && searchingProdItems.length ? (
              searchingProdItems.map((item) => renderSearchingProdItems(item))
            ) : (
              <View style={styles.dropdownNoneItem}>
                <Text style={styles.dropdownNoneText}>
                  Không có sản phẩm nào trùng khớp
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={DefaultTheme.flex_1}>
        {searchedProd && (
          <FlatList
            data={searchedProd}
            keyExtractor={(item) => item.id}
            renderItem={renderSearchProdItems}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  dropdownContainer: {
    height: "auto",
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    zIndex: 1,
  },
  dropdownItem: {
    height: "auto",
    backgroundColor: Colors.primaryGreen50,
  },
  dropdownSearching: {
    padding: 12,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#303030",
  },
  dropdownNoneItem: {
    height: 100,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: Colors.primaryGreen50,
    borderRadius: 12,
  },
  dropdownNoneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
});
