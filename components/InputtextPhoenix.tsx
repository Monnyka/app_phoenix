import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputtextPhoenix = ({
  placeholder = "Enter text...",
  secureTextEntry = false,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  ...props
}: any) => {
  return (
    <TextInput
      style={[styles.input, styles.multilineInput]}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      textContentType={secureTextEntry ? "password" : "none"}
      selectionColor={"#596E81"}
      placeholderTextColor="#596E81"
      multiline={multiline}
      numberOfLines={numberOfLines}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "auto",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#959595",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: "poppinssemibold",
    fontSize: 12,
    color: "#2E414F",
  },
  multilineInput: {
    height: "auto",
    paddingVertical: 10,
  },
});

export default InputtextPhoenix;
