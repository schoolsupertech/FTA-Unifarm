import React from "react";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

function ImageThumbnail({ images }) {
  const renderThumbnail = ({ item }) => (
    <TouchableOpacity
      onPress={() => console.log("Thumbnail pressed, show full image")}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderThumbnail}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default ImageThumbnail;

const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 8,
  },
});
