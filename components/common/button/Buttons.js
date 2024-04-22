import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ButtonFlex({ title, onPress, stylesText, stylesButton }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.buttonFlex, stylesButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonFlexText, stylesText]}>{title}</Text>
    </TouchableOpacity>
  );
}

function TwoButtonBottom({
  titleLeft,
  onPressLeft,
  buttonColorLeft,
  textColorLeft,
  titleRight,
  onPressRight,
  buttonColorRight,
  textColorRight,
}) {
  return (
    <View style={styles.twoButtonContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressLeft}
        style={[
          styles.twoBoxButtonFloatBottom,
          { backgroundColor: buttonColorLeft },
        ]}
      >
        <Ionicons
          name="close"
          size={20}
          color={textColorLeft}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.buttonFloatBottomText, { color: textColorLeft }]}>
          {titleLeft}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressRight}
        style={[
          styles.twoBoxButtonFloatBottom,
          { backgroundColor: buttonColorRight },
        ]}
      >
        <Ionicons
          name="add"
          size={20}
          color={textColorRight}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.buttonFloatBottomText, { color: textColorRight }]}>
          {titleRight}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ButtonFLoatBottom({ title, onPress, buttonColor }) {
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
}

function TwoButtonFloatBottom({
  titleLeft,
  onPressLeft,
  buttonColorLeft,
  textColorLeft,
  titleRight,
  onPressRight,
  buttonColorRight,
  textColorRight,
}) {
  return (
    <View style={styles.containerButtonFloatBottom}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
          borderTopWidth: 1,
          borderTopColor: "gray",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressLeft}
          style={[
            styles.twoBoxButtonFloatBottom,
            { marginLeft: 8, backgroundColor: buttonColorLeft },
          ]}
        >
          <Ionicons
            name="close-outline"
            size={20}
            color={textColorLeft}
            style={{ marginRight: 8 }}
          />
          <Text
            style={[styles.buttonFloatBottomText, { color: textColorLeft }]}
          >
            {titleLeft}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRight}
          style={[
            styles.twoBoxButtonFloatBottom,
            { backgroundColor: buttonColorRight },
          ]}
        >
          <Ionicons
            name="duplicate"
            size={20}
            color={textColorRight}
            style={{ marginRight: 8 }}
          />
          <Text
            style={[styles.buttonFloatBottomText, { color: textColorRight }]}
          >
            {titleRight}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { ButtonFlex, TwoButtonBottom, ButtonFLoatBottom, TwoButtonFloatBottom };

const styles = StyleSheet.create({
  // Style của Button Flex
  buttonFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    flexWrap: "wrap",
  },
  buttonFlexText: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
    fontWeight: 500,
  },

  // Style TwoButtonBottom
  twoButtonContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 8,
  },
  twoButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
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
    fontWeight: "600",
    fontSize: 16,
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
