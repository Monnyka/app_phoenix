import { View, Text, Image } from "react-native";
import React from "react";
import ButtonPhoenix from "./ButtonPhoenix";

const NoConnection = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../assets/ic_wifi.png")}
      />
      <Text
        style={{ marginTop: 20, fontFamily: "poppinssemibold", fontSize: 18 }}
      >
        Oops...
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 20,
          fontFamily: "poppinsregular",
          fontSize: 14,
          textAlign: "center",
          paddingHorizontal: 40,
        }}
      >
        There is no internet connection, please check your internet connection
        and try again.
      </Text>
      <ButtonPhoenix style={{ width: 160 }}>RETRY</ButtonPhoenix>
    </View>
  );
};

export default NoConnection;
