import React, { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CardCatItem from "../components/ui/categories/CardCatItem";
import LogoTitle from "../themes/LogoTitle";
import { CATEGORIES } from "../data/Data-Template";
import { DefaultTheme } from "../themes/DefaultTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");
  const { categoriesInfo } = useContext(AuthContext);

  function renderCategories(itemData) {
    function selectedCatListProdHandler() {
      navigation.navigate("CatListProdScreen", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CardCatItem
        title={itemData.item.name}
        code={itemData.item.code}
        description={itemData.item.description}
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
      <LinearGradient
        colors={["white", Colors.primaryGreen900]}
        style={styles.linearGradient}
      >
        <View style={styles.headerContainer}>
          <LogoTitle />
        </View>
        <Searchbar
          theme={DefaultTheme.searchbar}
          placeholder="Tìm kiếm danh mục"
          elevation={3}
          value={searchPrd}
          onChangeText={(prodSearch) => setSearchPrd(prodSearch)}
        />
      </LinearGradient>
      {/*
        categoriesInfo.forEach((element) => {
        console.log(element.name);
      })
      */}
      <FlatList
        data={categoriesInfo}
        keyExtractor={(item) => item.id}
        renderItem={renderCategories}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 4,
    marginBottom: 8,
    height: 45,
  },
  linearGradient: {
    width: "100%",
    padding: 20,
  },
});
