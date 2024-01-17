import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function CategoriesScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <View>
          <Text>Tất cả danh mục</Text>
        </View>
        <View style={{ flex: 1 }}>
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
                    Rau, củ, quả
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
                    Rau, củ, quả
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
