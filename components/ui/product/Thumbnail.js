import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

function Thumbnail({ gallery, onPickedImage }) {
  const [pickedImage, setPickedImage] = useState(gallery[0]);

  useEffect(() => {
    onPickedImage(pickedImage);
  }, [pickedImage]);

  return gallery.map((image) => (
    <TouchableOpacity
      key={image}
      onPress={() => {
        setPickedImage(image);
      }}
    >
      <Image
        source={{ uri: image }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  ));
}

export default Thumbnail;

const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 8,
  },
});
