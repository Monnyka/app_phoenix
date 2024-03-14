import {
  View,
  Text,
  Platform,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import ButtonPhoenix from "../components/ButtonPhoenix";
import InputtextPhoenix from "../components/InputtextPhoenix";
import { ScrollView } from "react-native-gesture-handler";

const login = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
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
              Manage all your task with Phoenix, Track your project progress
              more easier
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <InputtextPhoenix
              placeholder="Email"
              keyboardType={"email-address"}
            />
            <View style={{ marginTop: 14 }} />
            <InputtextPhoenix
              placeholder="Password"
              secureTextEntry={true}
              keyboardType="number-pad"
            />
            <View style={{ marginTop: 14 }}></View>
            <ButtonPhoenix style={{ marginBottom: 16 }}>LOGIN</ButtonPhoenix>
            <ButtonPhoenix style={{ marginBottom: 16 }} buttonType="secondary">
              REGISTER
            </ButtonPhoenix>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: { justifyContent: "flex-end" },
});

export default login;
