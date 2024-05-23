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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Dialog, PaperProvider, Portal } from "react-native-paper";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialogVisible, setDialogVisible] = React.useState(false);

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

  const saveToken = async (value: any) => {
    try {
      await AsyncStorage.setItem("token", value);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const callLoginApi = async () => {
    const apiUrl: any = process.env.EXPO_PUBLIC_API_URL + "/api/v1/auth/login";
    console.log(apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.token);
        console.log(data.token);

        router.push("./main");
      } else {
        setDialogVisible(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <PaperProvider>
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
                  callLoginApi();
                }}
                style={{ marginBottom: 16 }}
              >
                LOGIN
              </ButtonPhoenix>
              <ButtonPhoenix
                style={{ marginBottom: 16 }}
                buttonType="secondary"
              >
                REGISTER
              </ButtonPhoenix>
            </View>
          </View>
          <Portal>
            <Dialog
              visible={dialogVisible}
              onDismiss={() => setDialogVisible(false)}
            >
              <Dialog.Title>Login Failed</Dialog.Title>
              <Dialog.Content>
                <Text>Please check your credentails and try again.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialogVisible(false)}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  buttonContainer: { justifyContent: "flex-end" },
  icon: {
    padding: 10,
  },
});

export default login;
