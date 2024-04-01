import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

function InputField({
  label,
  icon,
  maxLength,
  inputType,
  autoCapitalize,
  autoCorrect,
  keyboardType,
  value,
  onChangeText,
  style,
}) {
  const mergedContainer = { ...styles.container, ...style };

  return (
    <View style={mergedContainer}>
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
        />
      ) : (
        <TextInput
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
        />
      )}
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
    fontSize: 16
  },
});
