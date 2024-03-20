import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import CardCatItem from "../components/ui/categories/CardCatItem";
import LogoTitle from "../themes/LogoTitle";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");
  const [categoriesInfo, setCategoriesInfo] = useState(null);

  useEffect(() => {
    const categoriesDataResponse = async () => {
      const response = await API.get("/categories");
      if (response) {
        setCategoriesInfo(response.payload);
      }
    };

    categoriesDataResponse();
  }, []);

  function renderCategories(itemData) {
    function selectedCatListProdHandler() {
      navigation.navigate("CatListProdScreen", {
        catRecomId: itemData.item.id,
      });
    }

    return (
      <CardCatItem
        title={itemData.item.name}
        // code={itemData.item.code}
        // description={itemData.item.description}
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
        style={DefaultTheme.linearGradient}
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
