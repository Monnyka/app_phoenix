import { router } from "expo-router";
import * as React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Appbar, Modal, PaperProvider, Portal } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";
import { I18n } from "i18n-js";

const Setting = () => {
  const translations = {
    en: {
      welcome: "Hello",
      name: "Charlie",
      Language: "Language",
      App_Version: "App Version",
    },
    km: { welcome: "សួស្ដី", Language: "ភាសា", App_Version: "កំណែកម្មវិធី" },
  };

  const [userLanguage, setuserLanguage] = React.useState("en");
  const i18n = new I18n(translations);
  i18n.locale = userLanguage;
  i18n.enableFallback = true;

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
            <TextHeaderPhoenix>Settings</TextHeaderPhoenix>

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
              <Text style={{ fontFamily: "poppinsregular" }}>Profile</Text>
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
                {/* <Text
                style={{
                  fontFamily: "poppinssemibold",
                  alignContent: "flex-end",
                  color: "#42802C",
                }}
              >
                Khmer
              </Text> */}

                <Image
                  style={{ width: 35, height: 35, padding: 16 }}
                  source={require("../assets/ic_united_states.png")}
                />
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
                1.0.0
              </Text>
            </View>
          </View>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Select Language</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => (setuserLanguage("km"), setVisible(false))}
            >
              <Image
                style={{ width: 35, height: 35, marginEnd: 10 }}
                source={require("../assets/ic_cambodia.png")}
              />
              <Text style={{ fontFamily: "poppinssemibold" }}>Khmer</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() => (setuserLanguage("en"), setVisible(false))}
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
