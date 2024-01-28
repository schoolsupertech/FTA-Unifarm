import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Card, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Color } from "../constants/colors";

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchPrd, setSearchPrd] = useState("");

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  function selectedCategoryDetail() {
    navigation.navigate("Categories", {
      screen: "CategoryDetail",
      params: { title: "Rau, củ, quả" },
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => console.log(event.nativeEvent.text),
        onSearchButtonPress: (event) =>
          console.log("Search", event.nativeEvent),
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/*
      <Searchbar
        style={{ marginTop: 10, marginHorizontal: 20 }}
        placeholder="Tìm kiếm"
        elevation={3}
        theme={{
          colors: {
            elevation: { level3: Color.primaryGreen50 },
            primary: Color.primaryGreen800,
          },
        }}
        value={searchPrd}
        onChangeText={displaySearchPrdText}
      />
      */}
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={selectedCategoryDetail}>
              <Card style={{ margin: 10, width: 170 }}>
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{
                    uri: "https://media.istockphoto.com/id/1457113212/vi/anh/rau-h%E1%BB%AFu-c%C6%A1-xanh-v%C3%A0-n%E1%BB%81n-th%E1%BB%B1c-ph%E1%BA%A9m-l%C3%A1-s%E1%BA%ABm-m%C3%A0u-nh%C6%B0-m%E1%BB%99t-kh%C3%A1i-ni%E1%BB%87m-%C4%83n-u%E1%BB%91ng-l%C3%A0nh-m%E1%BA%A1nh.jpg?s=1024x1024&w=is&k=20&c=--eEOkZpG3Kx0SmYtH35v3fOAvYeZ2jNDnKPvvS3WEU=",
                  }}
                />
                <Card.Content style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Rau, củ, quả
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Card style={{ margin: 10, width: 170 }}>
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{ uri: "https://picsum.photos/700" }}
                />
                <Card.Content style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Thịt, trứng, cá
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => {}}>
              <Card style={{ margin: 10, width: 170 }}>
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{ uri: "https://picsum.photos/700" }}
                />
                <Card.Content style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Trái cây tươi
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Card style={{ margin: 10, width: 170 }}>
                <Card.Cover
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                  source={{ uri: "https://picsum.photos/700" }}
                />
                <Card.Content style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Bột bánh
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({});
