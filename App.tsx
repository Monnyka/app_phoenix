import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./Settings";
import Task from "./Task";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CreateTask from "./Layout/CreateTask";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const sheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
    // Font is still loading, you can show a loading screen or messages
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
        <Text>Loading...</Text>
      </View>
    );
  }

  const openBottomSheet = () => {
    sheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Task"
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

        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <KeyboardAvoidingView>
              <CreateTask />
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
