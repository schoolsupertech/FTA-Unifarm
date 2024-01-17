import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

import { windowWidth } from "../utils/Dimensions";
import { sliderNewsLetters } from "../themes/sliderNewsLetters";
import BannerNewsLettersSlider from "../components/BannerNewsLettersSlider";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function HomeScreen() {
  const renderNewsLettersBanner = ({ item, index }) => {
    return <BannerNewsLettersSlider data={item} />;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search" />
        </View>

        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={sliderNewsLetters}
          renderItem={renderNewsLettersBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={320}
          loop={true}
        />

        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.categoryTitle}>Danh mục phổ biến</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{ color: "#0aada8", textDecorationLine: "underline" }}
              >
                Xem tất cả <Ionicons name="arrow-forward" />
              </Text>
            </TouchableOpacity>
          </View>
          {/* Danh mục */}
          <ScrollView horizontal={true}>
            {/* Add FlatList */}
            <TouchableOpacity onPress={() => {}}>
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
            </TouchableOpacity>
          </ScrollView>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
