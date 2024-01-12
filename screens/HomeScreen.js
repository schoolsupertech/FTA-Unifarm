import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function HomeScreen() {
  return (
    <ScrollView style={styles.baseContainer}>
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
