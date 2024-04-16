import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ButtonFlex = ({ title, onPress, stylesText, stylesButton }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.buttonFlex, stylesButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonFlexText, stylesText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const ButtonFloatBottom = ({ title, onPress, buttonColor }) => {
  return (
    <View style={styles.containerButtonFloatBottom}>
      <View style={styles.boxButtonFloatBottom}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.buttonFloatBottom, { backgroundColor: buttonColor }]}
          onPress={onPress}
        >
          <Text style={styles.buttonFloatBottomText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TwoButtonFloatBottom = ({
  titleLeft,
  onPressLeft,
  buttonColorLeft,
  colorTextLeft,
  titleRight,
  onPressRight,
  buttonColorRight,
  colorTextRight,
}) => {
  return (
    <View style={styles.containerButtonFloatBottom}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          borderTopWidth: 1,
          borderTopColor: "grey",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.twoBoxButtonFloatBottom,
            { marginLeft: 10, backgroundColor: buttonColorLeft },
          ]}
          onPress={onPressLeft}
        >
          <Icon
            name="chatbubble-ellipses-outline"
            size={20}
            color={colorTextLeft}
          />
          <Text
            style={[styles.buttonFloatBottomText, { color: colorTextLeft }]}
          >
            {" "}
            {titleLeft}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.twoBoxButtonFloatBottom,
            { backgroundColor: buttonColorRight },
          ]}
          onPress={onPressRight}
        >
          <Icon name="duplicate" size={20} color={colorTextRight} />
          <Text
            style={[styles.buttonFloatBottomText, { color: colorTextRight }]}
          >
            {" "}
            {titleRight}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Style của Button Flex
  buttonFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#16A80A",
    borderRadius: 5,
    flexWrap: "wrap",
  },
  buttonFlexText: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
    fontWeight: 500,
  },

  // Style của Button FloatBottom
  containerButtonFloatBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  boxButtonFloatBottom: {
    backgroundColor: "white",
    height: 80,
    justifyContent: "center",
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  buttonFloatBottom: {
    marginLeft: 80,
    marginRight: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#16A80A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonFloatBottomText: {
    color: "white",
    fontSize: 15,
  },
  twoBoxButtonFloatBottom: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
});

export { ButtonFlex, ButtonFloatBottom, TwoButtonFloatBottom };
