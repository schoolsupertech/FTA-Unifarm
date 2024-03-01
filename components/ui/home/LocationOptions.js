import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import MainButton from "../../common/button/MainButton";

function LocationOptions(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text>This is location screen</Text>
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
    width: "100%",
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "center",
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
    margin: 40,
  },
});
