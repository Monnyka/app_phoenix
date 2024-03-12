import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ButtonPhoenix from "../components/ButtonPhoenix";
import InputtextPhoenix from "../components/InputtextPhoenix";

const login = () => {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontFamily: "poppinssemibold" }}>
          Login
        </Text>
        <Text
          style={{
            fontSize: 14,
            alignContent: "center",
            textAlign: "center",
            fontFamily: "poppinsbold",
          }}
        >
          Manage all your task with Phoenix, Track your project progress more
          easier
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <InputtextPhoenix placeholder="Email" keyboardType={"email-address"} />
        <View style={{ marginTop: 14 }} />
        <InputtextPhoenix
          placeholder="Password"
          secureTextEntry={true}
          keyboardType="number-pad"
        />
        <View style={{ marginTop: 80 }}></View>
        <ButtonPhoenix style={{ marginBottom: 16 }}>LOGIN</ButtonPhoenix>
        <ButtonPhoenix style={{ marginBottom: 16 }} buttonType="secondary">
          REGISTER
        </ButtonPhoenix>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default login;
