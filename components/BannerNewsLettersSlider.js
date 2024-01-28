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
    height: 170,
    width: 320,
    borderRadius: 10,
  },
});
