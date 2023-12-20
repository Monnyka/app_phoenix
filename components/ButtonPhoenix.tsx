import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const ButtonPhoenix = (props: any) => {
  return (
    <Button style={{ ...styles.button, ...props.style }}>
      <Text style={{ ...styles.text }}>{props.children}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#69CA46",
    borderRadius: 14,
  },
  text: {
    fontFamily: "poppinssemibold",
    fontSize: 14,
    marginTop: 12,
    color: "white",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default ButtonPhoenix;
