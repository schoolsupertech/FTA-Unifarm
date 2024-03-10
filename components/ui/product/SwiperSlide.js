import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import { BASE_URL } from "../../../api/config";

function SwiperSlide({ prodItemId }) {
  const [prodItemImages, setProdItemImages] = useState(null);

  useLayoutEffect(() => {
    const fetchProdItemImg = () => {
      if (prodItemId) {
        axios
          .get(BASE_URL + "/product-item/" + prodItemId + "/product-images")
          .then((res) => {
            let prodItemImgs = res.data;
            console.log("Images: " + JSON.stringify(prodItemImgs.payload));
            setProdItemImages(prodItemImgs.payload);
          })
          .catch((e) => {
            console.log(
              "An error occurred while loading API-product-images" + e,
            );
            console.log("Message: " + e.response.status);
          });
      }
    };

    fetchProdItemImg();
    console.log("Product Item Id in SwiperSlide: " + prodItemId);
  }, []);

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
      {/* this.props.prodItemId.map((image) => (
          <View style={styles.slide} key={image}>
            <Image
              source={{ uri: image }}
              style={styles.img}
              resizeMode="stretch"
            />
          </View>
        )) */}
      {/*
      <View style={styles.slide} key={prodItemImages.id}>
        <Image
          source={{ uri: prodItemImages.imageUrl }}
          style={styles.img}
          resizeMode="stretch"
        />
      </View>
      */}
    </Swiper>
  );
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
