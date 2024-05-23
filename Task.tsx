import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import TextHeaderPhoenix from "./components/TextHeaderPhoenix";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompleteTask from "./Screen/CompleteTask";
import PendingTask from "./Screen/PendingTask";
import i18n from "./assets/translations/index";
import { LanguageContext, LanguageProvider } from "./LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Task({ onPress }: any) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const Tab = createMaterialTopTabNavigator();
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;

  const getTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token saved is:" + token);

      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch tasks: ${response.status} ${response.statusText}`
        );
      }

      const json = await response.json();
      console.log("Fetched tasks:", json.tasks); // Log the fetched tasks
      setData(json.tasks); // Update the component state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error appropriately, e.g., show a message to the user
    } finally {
      setLoading(false);
    }
  };

  //navigation instance
  const apiUrl: any = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    //getTasks();
  }, []);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FAFAFA", "#FAFAFA"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        //add edges to remote the unwated padding at the bottom
        edges={["top", "left", "right"]}
        style={{ paddingTop: 16, marginHorizontal: 0, flex: 1 }}
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
        <TextHeaderPhoenix style={{ marginTop: 30, paddingHorizontal: 16 }}>
          {i18n.t("Task_for_today")}
        </TextHeaderPhoenix>
        <Text
          style={{
            fontFamily: "poppinsregular",
            fontSize: 14,
            color: "#01044B",
            paddingHorizontal: 16,
          }}
        >
          {i18n.t("Pending_task_for_today")}
        </Text>
        <Tab.Navigator
          style={{ marginTop: 12 }}
          sceneContainerStyle={{
            backgroundColor: "transparent",
            paddingHorizontal: 16,
          }}
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
              borderColor: "#2E414F",
            },
            tabBarStyle: {
              backgroundColor: "#00000000",
              shadowColor: "#00000000",
              marginStart: 16,
            },
          }}
        >
          <Tab.Screen
            options={{ tabBarLabel: i18n.t("Pending") }}
            name="Pending"
            component={PendingTask}
          />
          <Tab.Screen
            options={{ tabBarLabel: i18n.t("Completed") }}
            name="Completed"
            component={CompleteTask}
          />
        </Tab.Navigator>
      </SafeAreaView>
      <FAB
        icon="pencil-plus-outline"
        color="#ffff"
        label={i18n.t("Add_Task")}
        style={styles.fab}
        onPress={() => router.push("./task_creation")}
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
    backgroundColor: "#2E414F",
    fontFamily: "poppinsregular",
  },
  item: {
    backgroundColor: "#C1D9FD",
    borderRadius: 14,
  },
});
