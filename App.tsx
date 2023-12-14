import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./Settings";
import Task from "./Task";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const [fontsLoaded] = useFonts({
    montserratregular: require("./assets/fonts/Montserrat-Regular.ttf"),
    montserratitalic: require("./assets/fonts/Montserrat-Italic.ttf"),
    montserratbold: require("./assets/fonts/Montserrat-Bold.ttf"),
    crimsonproregular: require("./assets/fonts/CrimsonPro-Regular.ttf"),
    crimsonproitalic: require("./assets/fonts/CrimsonPro-Italic.ttf"),
    crimsonprobold: require("./assets/fonts/CrimsonPro-Bold.ttf"),
    poppinsregular: require("./assets/fonts/Poppins-Regular.ttf"),
    poppinssemibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    // Font is still loading, you can show a loading screen or message
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    //   <Text style={{ fontFamily: "crimsonprobold", fontSize: 35 }}>
    //     Task for today
    //   </Text>
    //   <Text style={{ fontFamily: "montserratbold", fontSize: 16 }}>
    //     Typescript app version 1.0.0
    //   </Text>
    // </View>
    <SafeAreaProvider>
      <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Task"
            component={Task}
            options={{
              tabBarLabel: "Task",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="book-check-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: "Project",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="all-inclusive"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
