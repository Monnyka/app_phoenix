import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Project = () => {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <StatusBar backgroundColor="#4CAF5000" hidden={false} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ffff",
          }}
        >
          <Avatar.Image size={45} source={require("./assets/icon.png")} />
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
            <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
              Monnyka Pin
            </Text>
          </View>
        </View>
        <Avatar.Image size={35} source={require("./assets/icon.png")} />
      </View>
      <Text
        style={{
          marginTop: 30,
          fontFamily: "crimsonprobold",
          fontSize: 36,
          color: "#01044B",
        }}
      >
        Project
      </Text>
      <Text
        style={{
          fontFamily: "montserratregular",
          fontSize: 14,
          color: "#01044B",
        }}
      >
        Manage your pending task
      </Text>
    </SafeAreaView>
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
