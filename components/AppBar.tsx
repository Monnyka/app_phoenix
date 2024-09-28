import React from "react";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

const AppBar = () => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <Appbar.BackAction
        onPress={() => {
          router.back();
        }}
      />
    </Appbar.Header>
  );
};

export default AppBar;
