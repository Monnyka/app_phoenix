import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputtextPhoenix = ({
  placeholder = "Enter text...",
  secureTextEntry = false,
  multiline,
  numberOfLines,
  onChangeText,
  ...props
}: any) => {
  return (
    <TextInput
      style={[styles.input]}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      textContentType={secureTextEntry ? "password" : "none"}
      selectionColor={"#596E81"}
      placeholderTextColor="#596E81"
      {...props}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#959595",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: "poppinssemibold",
    fontSize: 12,
    color: "#2E414F",
  },
});

export default InputtextPhoenix;
