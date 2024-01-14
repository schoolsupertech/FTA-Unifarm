import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "fff" }}>
      <ScrollView style={styles.baseContainer}>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#C6C6C6",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search" />
        </View>
        <Image
          style={styles.image}
          source={require("../assets/images/banner-big.png")}
          resizeMode="cover"
        />
        {/* Main View */}
        <View style={{ marginVertical: 10 }}>
          {/* Tiêu đề mục */}
          <View>
            <Text style={styles.categoryTitle}>Danh mục phổ biến</Text>
          </View>
          {/* Danh mục */}
          <ScrollView horizontal={true}>
            {/* Add FlatList */}
            <Card style={{ margin: 10 }}>
              <Card.Cover
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 10,
                }}
                source={{ uri: "https://picsum.photos/700" }}
              />
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              />
            </Card>
          </ScrollView>
          <View>
            <Text>Xem tất cả</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.categoryTitle}>Sản phẩm khuyên dùng</Text>
          </View>
          {/* Add FlatList */}
          <View style={{ flexDirection: "row" }}>
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
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              />
            </Card>
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
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              />
            </Card>
          </View>
          <View style={{ flexDirection: "row" }}>
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
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              />
            </Card>
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
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={LeftContent}
              />
            </Card>
          </View>
          <View>
            <Text>Cac san pham</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    marginTop: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "100%",
    height: 200,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
