import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Colors from "../constants/Color";

const ButtonPhoenix = (props: any) => {
  const { buttonType } = props;
  let backgroundColor = Colors.BASE_COLOR;
  let textColor = "white";

  if (buttonType === "secondary") {
    backgroundColor = "#E6EDFB";
    textColor = "#5786E6";
  }

  return (
    <View style={{ ...styles.button, ...props.style, backgroundColor }}>
      <Text
        style={{
          ...styles.text,
          fontFamily: "poppinssemibold",
          color: textColor,
        }}
      >
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  text: {
    fontFamily: "poppinssemibold",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default ButtonPhoenix;
