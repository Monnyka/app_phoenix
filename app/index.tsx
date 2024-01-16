import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
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
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CreateTask from "../Layout/CreateTask";
import Project from "../Project";

const HomePage = () => {
  const Tab = createMaterialBottomTabNavigator();
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["45%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    // Add a listener for keyboard dismissal
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Close the BottomSheet when the keyboard is dismissed
        sheetRef.current?.snapToIndex(0);
      }
    );

    // Remove the listener when the component unmounts
    // return () => {
    //   keyboardDidHideListener.remove();
    // };
  }, []);

  const [fontsLoaded] = useFonts({
    montserratregular: require("../assets/fonts/Montserrat-Regular.ttf"),
    montserratitalic: require("../assets/fonts/Montserrat-Italic.ttf"),
    montserratbold: require("../assets/fonts/Montserrat-Bold.ttf"),
    crimsonproregular: require("../assets/fonts/CrimsonPro-Regular.ttf"),
    crimsonproitalic: require("../assets/fonts/CrimsonPro-Italic.ttf"),
    crimsonprobold: require("../assets/fonts/CrimsonPro-Bold.ttf"),
    poppinsregular: require("../assets/fonts/Poppins-Regular.ttf"),
    poppinssemibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
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
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#4CAF4F00" hidden={false} />
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
            name="Project"
            component={Project}
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
