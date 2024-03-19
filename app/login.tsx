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
import { router } from "expo-router";
import callLoginApi from "../api";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // const handleLogin = async () => {
  //   try {
  //     const response = await callLoginApi(email, password);
  //     // Handle the API response, e.g., navigate to the next screen
  //     router.push("./main");
  //   } catch (error) {
  //     // Handle login error, e.g., show an error message
  //     console.error("Login error:", error);
  //   }
  // };

  const callLoginApi = async (email: any, password: any) => {
    const API_URL: any = "https://uat.monnyka.top/api/v1/auth/login"; // Replace 'your-api-url' with your actual API URL
    console.log("called");
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      // Navigate to the next screen
      router.push("./main");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        alwaysBounceHorizontal={false}
        bounces={false}
        contentContainerStyle={{ flex: 1, padding: 12 }}
      >
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
              onChangeText={setEmail}
            />
            <View style={{ marginTop: 14 }} />
            <View>
              <InputtextPhoenix
                placeholder="Password"
                secureTextEntry={showPassword}
                keyboardType="default"
                onChangeText={setPassword}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 52,
                  position: "absolute",
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  paddingEnd: 12,
                }}
                onPress={toggleShowPassword}
              >
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 14 }}></View>
            <ButtonPhoenix
              onPress={() => {
                callLoginApi(email, password);
              }}
              style={{ marginBottom: 16 }}
            >
              LOGIN
            </ButtonPhoenix>
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
