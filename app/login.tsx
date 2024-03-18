import {
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ButtonPhoenix from "../components/ButtonPhoenix";
import InputtextPhoenix from "../components/InputtextPhoenix";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flex: 1, padding: 12 }}>
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
              secureTextEntry={showPassword}
              keyboardType="default"
            />
            <TouchableOpacity style={styles.icon} onPress={toggleShowPassword}>
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
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
  icon: {
    padding: 10,
  },
});

export default login;
