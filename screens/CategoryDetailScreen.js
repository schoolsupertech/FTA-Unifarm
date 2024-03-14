import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Card, Chip, IconButton, Searchbar } from "react-native-paper";
import { Colors } from "../constants/Colors";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function CategoryDetailScreen({ route, navigation }) {
  // const id = route.params.id;
  // const selectedId = [NAME_OF_DATA].find((data) => data.id === id);

  // Preload Icon
  // function headerButtonPressHandler() {
  //   console.log("");
  // }
  //
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (
  // <IconButton
  //   icon="star"
  //   color={color}
  //   size={size}
  //   onPress={headerButtonPressHandler}
  // />
  //       );
  //     },
  //   });
  // }, [navigation, headerButtonPressHandler]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        style={{ marginTop: 10, marginHorizontal: 20 }}
        placeholder="Tìm kiếm sản phẩm trong danh mục"
        elevation={3}
        theme={{
          colors: {
            elevation: { level3: Colors.primaryGreen50 },
            primary: Colors.primaryGreen800,
          },
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        <View
          style={{
            marginHorizontal: 10,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Filter by Product Type */}
          <ScrollView horizontal={true}>
            <Chip
              style={{
                marginRight: 10,
                backgroundColor: Colors.primaryGreen100,
              }}
              onPress={() => {}}
            >
              Tất cả
            </Chip>
            <Chip
              style={{
                marginRight: 10,
                backgroundColor: Colors.primaryGreen500,
              }}
              onPress={() => {}}
            >
              Rau
            </Chip>
            <Chip style={{ marginRight: 10 }} onPress={() => {}}>
              Củ
            </Chip>
            <Chip style={{ marginRight: 10 }} onPress={() => {}}>
              Quả
            </Chip>
          </ScrollView>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 10,
  },
});
