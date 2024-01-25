import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Searchbar } from "react-native-paper";
import { useState } from "react";
import { Color } from "../constants/colors";

function CategoriesScreen({ navigation }) {
  const [searchPrd, setSearchPrd] = useState("");

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <ScrollView style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
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
