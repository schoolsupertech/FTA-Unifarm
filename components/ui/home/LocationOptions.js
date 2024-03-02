import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../common/button/MainButton";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function LocationOptions(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text>This is location screen</Text>
          <View>
            <Ionicons name="location" />
            <Text>Province</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btnGroup}>
            <MainButton onPress={props.onPress} label="Save" />
          </View>
          <View style={styles.btnGroup}>
            <MainButton onPress={props.onCancel} label="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LocationOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.bgColor,
  },
  modalView: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 20,
    paddingLeft: 12,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtInputContainer: {
    backgroundColor: DefaultTheme.btnBgColor800,
  },
  txtInput: {
    color: DefaultTheme.btnColor700,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btnGroup: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 40,
    marginBottom: 40,
  },
});
