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
      colors={["#FAFAFA", "#FAFAFA"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        //add edges to remote the unwated padding at the bottom
        edges={["top", "left", "right"]}
        style={{ paddingTop: 16, paddingHorizontal: 0, flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable>
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
                  fontFamily: "poppinssemibold",
                  color: "#626262",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {i18n.t("Welcome_back_Have_a_nice_day")}
              </Text>
              <Text style={{ fontFamily: "poppinssemibold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <TextHeader style={{ marginTop: 30, paddingLeft: 16 }}>
          {i18n.t("Project")}
        </TextHeader>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#151515", fontSize: 16 }}>
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
