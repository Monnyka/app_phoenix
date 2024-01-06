import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const taskdetails = () => {
  const params = useLocalSearchParams();
  const name = params.name;
  const taskDescription = params.taskDescription;
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#C1D9FD", "#6889FF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: "#ffffff00" }}>
          <Appbar.BackAction
            onPress={() => {
              router.back();
            }}
          />
        </Appbar.Header>
        <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 16, backgroundColor: "#FFFFFF00" }}>
            <Text
              style={{
                fontFamily: "poppinssemibold",
                fontSize: 20,
                color: "#01044B",
              }}
            >
              {taskName}
            </Text>

            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
              }}
            >
              {taskDescription}
            </Text>

            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
                marginTop: 20,
              }}
            >
              Create Date: 10 Jan, 2024
            </Text>

            <Text
              style={{
                fontFamily: "poppinsregular",
                fontSize: 14,
                color: "#414141",
              }}
            >
              Due Date: 10 Jan, 2024
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default taskdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
