import { router } from "expo-router";
import * as React from "react";
import { StatusBar, View, Text, StyleSheet, Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import i18n from "../assets/translations/index";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import { useContext } from "react";

const Profile = () => {
  //Translation
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction
            onPress={() => {
              router.back();
            }}
          />
        </Appbar.Header>
        <View style={{ paddingHorizontal: 16, backgroundColor: "#FFFFFF" }}>
          <Text
            style={{
              fontFamily: "crimsonprobold",
              fontSize: 36,
              color: "#01044B",
            }}
          >
            {i18n.t("Profile")}
          </Text>

          {/* Setting Item Profile */}
          <View
            style={{
              height: 58,
              backgroundColor: "#C1D9FD",
              marginTop: 20,
              borderRadius: 10,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: "poppinsregular", alignSelf: "center" }}>
              {i18n.t("Username")}
            </Text>
            <Pressable>
              <Text
                style={{
                  fontFamily: "poppinssemibold",
                  alignContent: "flex-end",
                  color: "#42802C",
                }}
              >
                Monnyka Pin
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
