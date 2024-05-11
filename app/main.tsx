import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { BackHandler, Keyboard, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import Task from "../Task";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Project from "../Project";
import i18n from "../assets/translations/index";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import "react-native-reanimated";

const HomePage = () => {
  const Tab = createMaterialBottomTabNavigator();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const getData = async () => {
    try {
      const storeData = await AsyncStorage.getItem("userLanguage");
      if (storeData !== null) {
        // value previously
        changeLanguage(storeData);
      }
    } catch (e) {
      // error reading value
    }
  };

  //Translate
  const { language, changeLanguage } = useContext(LanguageContext)!;
  i18n.locale = language;

  useEffect(() => {
    // Add a listener for keyboard dismissal
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {}
    );
  }, []);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
        <Tab.Navigator>
          <Tab.Screen
            name={i18n.t("Task")}
            options={{
              tabBarIcon: ({ color }: any) => (
                <MaterialCommunityIcons
                  name="book-check-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          >
            {() => <Task />}
          </Tab.Screen>
          <Tab.Screen
            name={i18n.t("Project")}
            component={Project}
            options={{
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
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default HomePage;

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
