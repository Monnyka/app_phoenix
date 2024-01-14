import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TextHeader from "./components/TextHeaderPhoenix";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { I18n } from "i18n-js";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: { welcome: "Hello", name: "Charlie" },
  km: { welcome: "សួស្ដី" },
};

const i18n = new I18n(translations);
// To see the fallback mechanism uncomment the line below to force the app to use the Khmer language.
i18n.locale = "km";
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

const Project = () => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#C1D9FD", "#6889FF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        //add edges to remote the unwated padding at the bottom
        edges={["top", "left", "right"]}
        style={{ paddingTop: 16, paddingHorizontal: 14, flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable onPress={() => router.push("./profile")}>
              <Avatar.Image
                size={45}
                source={require("./assets/pikachu.jpg")}
              />
            </Pressable>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "montserratbold",
                  color: "#626262",
                  fontSize: 12,
                }}
              >
                Welcome back, Have a nice day!
              </Text>

              <Text>{i18n.t("welcome")}</Text>
              <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <TextHeader style={{ marginTop: 30 }}>Project</TextHeader>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 22 }}>
            Project is coming Soon
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
