import React from "react";
import { Image, StyleSheet } from "react-native";

function LogoTitle({ imgStyle }) {
  return (
    <Image
      style={[styles.image, imgStyle]}
      source={require("../assets/images/Title_Plant_Logo.png")}
      resizeMode="stretch"
    />
  );
}

export default LogoTitle;

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "100%",
  },
});
