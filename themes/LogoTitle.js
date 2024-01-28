import { Image, StyleSheet } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={require("../assets/images/Title_Plant_Logo.png")}
      resizeMode="cover"
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
