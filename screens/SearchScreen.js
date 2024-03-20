import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Searchbar } from "react-native-paper";
import CardProdItem from "../components/ui/home/CardProdItem";

function SearchScreen({ route }) {
  const searchItem = route.params.searchItem;
  const { searchKey, setSearchKey } = useState("");
  const { searchPrd, setSearchPrd } = useState("");

  useEffect(() => {
    searchItem && setSearchKey(searchItem);
    console.log("Search Item: " + searchItem);
  }, [searchItem]);

  function searchPrdHandler() {
    // const response = API.get("/search", searchKey);
    // setSearchPrd(response.data);
    setSearchPrd(searchKey);
  }

  function renderSearchProdHandler(itemData) {
    const item = itemData.item;
    const prodItemProps = {
      id: item.id,
      title: item.title,
      // sold: item.sold,
      price: item.price,
      // listedPrice: item.listedPrice,
    };

    function AddingCartHandler(cartAdded) {
      console.log("Cart added");
    }

    return <CardProdItem {...prodItemProps} onAddingCart={AddingCartHandler} />;
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <LinearGradient
        colors={["white", Colors.primaryGreen900]}
        style={styles.linearGradient}
      >
        <Searchbar
          placeholder="Tìm kiếm sản phẩm"
          elevation={3}
          theme={DefaultTheme.searchbar}
          value={searchKey}
          onChangeText={(value) => setSearchKey(value)}
          onIconPress={searchPrdHandler}
        />
      </LinearGradient>
      {searchPrd.length === 0 ? (
        <View style={styles.container}>
          <Image />
          <View>
            <Text>Not found</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={searchPrd}
          keyExtractor={(item) => item.id}
          renderItem={renderSearchProdHandler}
        />
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    padding: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  headerContainer: {},
  bodyContainer: {},
  container: {
    flex: 1,
  },
  text: {},
});
