import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "../../../constants/colors";

function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View style={styles.container}>
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.textInput}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.textInput}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={styles.btnText}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
  btnText: {
    color: Colors.primaryGreen800,
    fontWeight: "700",
  },
});
