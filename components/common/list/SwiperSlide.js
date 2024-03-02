import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

class SwiperSlide extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        nextButton={
          <Ionicons name="arrow-forward-sharp" color={"green"} size={20} />
        }
        prevButton={
          <Ionicons name="arrow-back-outline" color={"green"} size={20} />
        }
        activeDotColor="green"
      >
        {this.props.gallery.map((image) => (
          <View style={styles.slide} key={image}>
            <Image
              source={{ uri: image }}
              style={styles.img}
              resizeMode="stretch"
            />
          </View>
        ))}
      </Swiper>
    );
  }
}

export default SwiperSlide;

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "85%",
    height: 280,
    borderRadius: 8,
  },
});
