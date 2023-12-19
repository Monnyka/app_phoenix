import { router } from "expo-router";
import * as React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Profile = () => {
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
            Profile
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
