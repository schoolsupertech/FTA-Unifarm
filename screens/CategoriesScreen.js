import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CardCatItem from "../components/ui/categories/CardCatItem";
import { CATEGORIES } from "../data/Data-Template";
import { DefaultTheme } from "../themes/DefaultTheme";

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");

  function renderCategories(itemData) {
    function selectedCatListProdHandler() {
      navigation.navigate("CatListProdScreen", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CardCatItem
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={selectedCatListProdHandler}
      />
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <Searchbar
        style={styles.searchBar}
        theme={DefaultTheme.searchbar}
        placeholder="Tìm kiếm danh mục"
        elevation={3}
        value={searchPrd}
        onChangeText={(prodSearch) => setSearchPrd(prodSearch)}
      />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategories}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
