import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Checkbox,
  FAB,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import TextHeaderPhoenix from "./components/TextHeaderPhoenix";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompleteTask from "./Screen/CompleteTask";
import PendingTask from "./Screen/PendingTask";

export default function Task({ onPress }: any) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const Tab = createMaterialTopTabNavigator();

  const getTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      setData(json.tasks);
      console.log("called get data");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string) => {
    try {
      const response = await fetch(apiUrl + id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.ok) {
        console.log("Task updated successfully");
        getTasks();
        // Reset the input fields after successful creation
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error update task:", error);
    }
  };

  //navigation instance
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    getTasks();
  }, []);

  //Using the react-navigation library
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getTasks();
  //   });
  //   // Clean up the listener when the component is unmounted
  //   return unsubscribe;
  // }, [navigation]);

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
              <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
                Monnyka Pin
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/settings")}>
            <Avatar.Icon size={35} icon={"cog"} />
          </Pressable>
        </View>
        <TextHeaderPhoenix style={{ marginTop: 30 }}>
          Task for today
        </TextHeaderPhoenix>
        <Text
          style={{
            fontFamily: "poppinsregular",
            fontSize: 11,
            color: "#01044B",
          }}
        >
          Manage your pending task
        </Text>
        <Tab.Navigator
          style={{ marginTop: 12 }}
          sceneContainerStyle={{ backgroundColor: "transparent" }}
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 12,
              fontStyle: "normal",
              fontFamily: "poppinssemibold",
              elevation: 0,
              backgroundColor: "transparent",
            },
            //tabBarAndroidRipple: { borderless: false },
            tabBarItemStyle: { width: 120 },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#414141",
            tabBarIndicatorStyle: {
              borderBottomWidth: 38,
              borderRadius: 60,
              marginBottom: 6,
              borderColor: "#69CA46",
            },
            tabBarStyle: {
              backgroundColor: "#00000000",
              shadowColor: "#00000000",
            },
          }}
        >
          <Tab.Screen
            options={{ tabBarLabel: "Pending" }}
            name="Pending"
            component={PendingTask}
          />
          <Tab.Screen
            options={{ tabBarLabel: "Completed" }}
            name="Completed"
            component={CompleteTask}
          />
        </Tab.Navigator>
      </SafeAreaView>
      <FAB
        icon="pencil-plus-outline"
        color="#ffff"
        label="Add Task"
        style={styles.fab}
        onPress={onPress}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundColor: "#69CA46",
    fontFamily: "poppinsregular",
  },
  item: {
    backgroundColor: "#C1D9FD",
    borderRadius: 14,
  },
});
