import { router } from "expo-router";
import * as React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import {
  Appbar,
  Button,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";
import i18n from "../assets/translations/index";
import { useContext } from "react";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Setting = () => {
  const { language, changeLanguage } = useContext(LanguageContext)!;
  const [userLanguage, setuserLanguage] = React.useState(language);
  i18n.locale = userLanguage;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  };

  const storeData = async (userDataLanguage: any) => {
    try {
      await AsyncStorage.setItem("userLanguage", userDataLanguage);
    } catch (e) {
      // saving error
    }
  };

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.push("./login");
    } catch (error) {
      console.error("Error clearing token:", error);
      // Handle error appropriately
    }
  };

  const getData = async () => {
    try {
      const storeData = await AsyncStorage.getItem("userLanguage");
      if (storeData !== null) {
        // value previously
        console.log(storeData);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <PaperProvider>
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
            <TextHeaderPhoenix>{i18n.t("Settings")}</TextHeaderPhoenix>

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
              <Text style={{ fontFamily: "poppinsregular" }}>
                {i18n.t("Profile")}
              </Text>
              <Pressable onPress={() => router.push("./profile")}>
                <Text
                  style={{
                    fontFamily: "poppinssemibold",
                    alignContent: "flex-end",
                    color: "#42802C",
                  }}
                >
                  View
                </Text>
              </Pressable>
            </View>

            {/* Setting Item Languge */}
            <View
              style={{
                height: 58,
                backgroundColor: "#C1D9FD",
                marginTop: 10,
                borderRadius: 10,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "poppinsregular" }}>
                {i18n.t("Language")}
              </Text>
              <Pressable onPress={() => setVisible(true)}>
                {userLanguage === "km"
                  ? (storeData("km"),
                    (
                      <Image
                        style={{ width: 35, height: 35, padding: 16 }}
                        source={require("../assets/ic_cambodia.png")}
                      />
                    ))
                  : (storeData("en"),
                    (
                      <Image
                        style={{ width: 35, height: 35, padding: 16 }}
                        source={require("../assets/ic_united_states.png")}
                      />
                    ))}
              </Pressable>
            </View>

            {/* Setting Item App Version*/}
            <View
              style={{
                height: 58,
                backgroundColor: "#C1D9FD",
                marginTop: 10,
                borderRadius: 10,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "poppinsregular" }}>
                {i18n.t("App_Version")}
              </Text>
              <Text
                style={{
                  fontFamily: "poppinssemibold",
                  alignContent: "flex-end",
                }}
              >
                1.1.0
              </Text>
            </View>

            {/* lOGOUT*/}
            <View
              style={{
                height: 58,
                backgroundColor: "#C1D9FD",
                marginTop: 10,
                borderRadius: 10,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "poppinsregular" }}>
                {i18n.t("App_Version")}
              </Text>
              <Pressable
                onPress={() => {
                  clearToken();
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppinssemibold",
                    alignContent: "flex-end",
                    color: "red",
                  }}
                >
                  Log Out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>{i18n.t("Choose_Language")}</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => (
                setuserLanguage("km"), setVisible(false), changeLanguage("km")
              )}
            >
              <Image
                style={{ width: 35, height: 35, marginEnd: 10 }}
                source={require("../assets/ic_cambodia.png")}
              />
              <Text style={{ fontFamily: "poppinssemibold" }}>
                {i18n.t("Khmer")}
              </Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() => (
                setuserLanguage("en"), setVisible(false), changeLanguage("en")
              )}
            >
              <Image
                style={{ width: 35, height: 35, marginEnd: 10 }}
                source={require("../assets/ic_united_states.png")}
              />
              <Text style={{ fontFamily: "poppinssemibold" }}>English</Text>
            </Pressable>
          </Modal>
        </Portal>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
