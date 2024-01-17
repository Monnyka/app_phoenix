import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TextHeader from "./components/TextHeaderPhoenix";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "./assets/translations/index";
import { LanguageContext, LanguageProvider } from "./LanguageContext";

const Project = () => {
  //Translation
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;
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
                {i18n.t("Welcome_back_Have_a_nice_day")}
              </Text>
              <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <TextHeader style={{ marginTop: 30 }}>{i18n.t("Project")}</TextHeader>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 22 }}>
            {i18n.t("Project_Coming_Soon")}
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
