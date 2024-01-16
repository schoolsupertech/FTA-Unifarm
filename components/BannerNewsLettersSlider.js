import { View, Image, StyleSheet } from "react-native";

export default function BannerNewsLettersSlider({ data }) {
  return (
    <View>
      <Image source={data.image} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    height: 200,
    width: 370,
    borderRadius: 10,
  },
});
