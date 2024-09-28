import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputTextMultiPhoenix = ({
  placeholder = "Enter text...",
  multiline = true,
  numberOfLines = 3, // Default to 4 lines if multiline is true
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input]}
      placeholder={placeholder}
      selectionColor={"#596E81"}
      placeholderTextColor="red"
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : undefined}
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
    paddingVertical: 15,
    fontFamily: "poppinssemibold",
    fontSize: 12,
    color: "#2E414F",
    alignSelf: "stretch",
  },
});

export default InputTextMultiPhoenix;
