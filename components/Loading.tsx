import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator animating={true} color={"#2E414F"} size={"large"} />
      <Text
        style={{ marginTop: 20, fontFamily: "poppinssemibold", fontSize: 14 }}
      >
        Loading, Please wait.
      </Text>
    </View>
  );
};

export default Loading;
