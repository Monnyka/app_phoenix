import { router } from "expo-router";
import * as React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextHeaderPhoenix from "../components/TextHeaderPhoenix";

const Setting = () => {
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
            <Text style={{ fontFamily: "poppinsregular" }}>App Version</Text>
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
    </SafeAreaProvider>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
