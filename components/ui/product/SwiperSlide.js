import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import { BASE_URL } from "../../../api/config";

function SwiperSlide({ prodItemId }) {
  const [prodItemImages, setProdItemImages] = useState(null);

  const fetchProdItemImg = async () => {
    await axios
      .get(BASE_URL + "/product-item/" + prodItemId + "/product-images")
      .then((res) => {
        let prodItemImgs = res.data;
        setProdItemImages(prodItemImgs.payload);
      })
      .catch((e) => {
        console.log("An error occurred while loading API-product-images" + e);
        console.log("Message: " + e.response.status);
      });
  };

  useEffect(() => {
    fetchProdItemImg();
  }, []);

  return (
    <>
      {prodItemImages ? (
        <Swiper style={styles.wrapper} activeDotColor="green">
          {/* this.props.prodItemId.map((image) => (
          <View style={styles.slide} key={image}>
            <Image
              source={{ uri: image }}
              style={styles.img}
              resizeMode="stretch"
            />
          </View>
        )) */}
          {prodItemImages.map((imgs) => (
            <View style={styles.slide} key={imgs.id}>
              <Image
                source={{ uri: imgs.imageUrl }}
                style={styles.img}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </>
  );
}

export default SwiperSlide;

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "95%",
    height: 280,
    borderRadius: 8,
  },
});
