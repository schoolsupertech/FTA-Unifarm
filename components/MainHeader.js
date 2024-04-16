import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";

const MainHeader = ({ iconHeader, navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.top}>
        <View
          style={{
            height: 40,
            width: 40,
            marginLeft: 20,
            justifyContent: "center",
          }}
        >
          {iconHeader && <Icon name={iconHeader} size={25} color={"black"} />}
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/backgrounds/Logo.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <Text style={styles.typeText1}>FTA</Text>
        </View>
        <View style={{ marginRight: 20, justifyContent: "center" }}>
          <Pressable
          // onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={{
                uri: "https://banner2.cleanpng.com/20180619/epr/kisspng-avatar-photo-booth-computer-icons-email-stewardess-5b292bfebc29e1.5698032815294248947707.jpg",
              }}
              style={{ height: 40, width: 40, borderRadius: 50 }}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  top: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 80,
  },

  typeText1: {
    fontSize: 24,
    color: Colors.primaryGreen700,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  typeText2: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
});
export default MainHeader;
