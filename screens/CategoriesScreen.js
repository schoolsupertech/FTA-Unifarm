import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import TopHeader from "../components/common/headers/TopHeader";
import TopHeaderLogin from "../components/common/headers/TopHeaderLogin";
import CardCatItem from "../components/ui/categories/CardCatItem";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");
  const [categoriesInfo, setCategoriesInfo] = useState(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const categoriesDataResponse = async () => {
      const response = await API.get("/categories-recommends");
      // if (response) {
      //   setCategoriesInfo(
      //     response.payload.filter((item) => item.status === "Active"),
      //   );
      // }
      setCategoriesInfo(response.payload);
    };

    categoriesDataResponse();
  }, []);

  function renderCategories(itemData) {
    function selectedCatListProdHandler() {
      navigation.navigate("CatListProdScreen", {
        catRecomId: itemData.item.id,
        catRecomName: itemData.item.name,
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
        {authState?.authenticated ? (
          <TopHeader
            onCartIconPress={() => navigation.navigate("CartScreen")}
            onNotiIconPress={() => {
              navigation.navigate("Notification");
            }}
          />
        ) : (
          <TopHeaderLogin
            onLoginPress={() => navigation.navigate("AuthScreen")}
          />
        )}
        <View style={{ marginTop: 8 }}>
          <Searchbar
            theme={DefaultTheme.searchbar}
            placeholder="Tìm kiếm danh mục..."
            elevation={2}
            value={searchPrd}
            onChangeText={(prodSearch) => setSearchPrd(prodSearch)}
          />
        </View>
      </LinearGradient>
      <FlatList
        data={categoriesInfo}
        keyExtractor={(item) => item.id}
        renderItem={renderCategories}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20, marginHorizontal: 10 }}
      />
    </SafeAreaView>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({});
