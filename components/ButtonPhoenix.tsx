import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonPhoenix = (props: any) => {
  return (
    <View
      style={{
        height: 48,
        backgroundColor: "#69CA46",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 14,
      }}
    >
      <TouchableOpacity style={{ ...styles.button, ...props.style }}>
        <Text style={{ ...styles.text }}>{props.children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#69CA46",
    borderRadius: 16,
  },
  text: {
    fontFamily: "poppinssemibold",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});

export default ButtonPhoenix;
