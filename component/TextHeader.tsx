import React from "react";
import { Text, StyleSheet } from "react-native";

const TextHeader = (props: any) => {
  return (
    <Text style={{ ...styles.headerText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "crimsonprobold",
    fontSize: 36,
    color: "#01044B",
  },
});

export default TextHeader;
