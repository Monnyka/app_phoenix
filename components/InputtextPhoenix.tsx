import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputtextPhoenix = ({
  placeholder = "Enter text...",
  secureTextEntry = false,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={() => {}}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      textContentType="password"
      selectionColor={"#596E81"}
      placeholderTextColor="#596E81"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#959595",
    paddingHorizontal: 20,
    fontFamily: "poppinssemibold",
    justifyContent: "center",
    alignSelf: "stretch",
    fontSize: 12,
    paddingTop: 0,
    color: "#2E414F",
  },
});

export default InputtextPhoenix;
