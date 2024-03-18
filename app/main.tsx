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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CreateTask from "../Layout/CreateTask";
import Project from "../Project";
import i18n from "../assets/translations/index";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const HomePage = () => {
  const Tab = createMaterialBottomTabNavigator();
  const sheetRef = useRef<BottomSheet>(null);

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

  // variables
  const snapPoints = useMemo(() => ["45%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    //getData();
    // Add a listener for keyboard dismissal
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Close the BottomSheet when the keyboard is dismissed
        sheetRef.current?.snapToIndex(0);
      }
    );
  }, []);

  const openBottomSheet = () => {
    sheetRef.current?.expand();
  };

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
            {() => <Task onPress={openBottomSheet} />}
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

        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive"
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <CreateTask />
          </BottomSheetView>
        </BottomSheet>
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
