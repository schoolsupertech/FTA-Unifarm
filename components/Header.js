import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header({ title, rightIcon, onPress, onPressRight }) {
  return (
    <SafeAreaView>
      <View style={styles.top}>
        <Pressable onPress={onPress}>
          <View
            style={{
              height: 40,
              width: 40,
              marginLeft: 20,
              justifyContent: "center",
            }}
          >
            <Icon name="chevron-back-outline" size={28} color={"black"} />
          </View>
        </Pressable>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <Pressable onPress={onPressRight}>
          <View
            style={{
              marginRight: 20,
              width: 40,
              height: 40,
              justifyContent: "center",
            }}
          >
            <Icon name={rightIcon} size={28} color={"black"} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 80,
  },

  textTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
