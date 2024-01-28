import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Card, Chip, IconButton, Searchbar } from "react-native-paper";

import ChipContent from "../components/list/ChipContent";
import { Color } from "../constants/colors";
import { CHIPCATEGORYCONTENT } from "../constants/chipCategoryContent";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function CategoryDetailScreen({ route, navigation }) {
  // const id = route.params.id;
  // const selectedId = [NAME_OF_DATA].find((data) => data.id === id);
  const [isChipSelected, setIsChipSelected] = useState(true);

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
            elevation: { level3: Color.primaryGreen50 },
            primary: Color.primaryGreen800,
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
          <ChipContent
            chipData={CHIPCATEGORYCONTENT}
            chipSelected={isChipSelected}
          />
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
                source={{
                  uri: "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
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
