import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { BASE_COLOR } from "../constants/Color";

const IndexScreen = () => {
  const navigation = useNavigation();

  const checkTokenAndNavigate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("./login");
      } else {
        router.push("./main");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const [fontsLoaded] = useFonts({
    poppinsbold: require("../assets/fonts/Poppins-Bold.ttf"),
    crimsonproregular: require("../assets/fonts/CrimsonPro-Regular.ttf"),
    crimsonproitalic: require("../assets/fonts/CrimsonPro-Italic.ttf"),
    crimsonprobold: require("../assets/fonts/CrimsonPro-Bold.ttf"),
    poppinsregular: require("../assets/fonts/Poppins-Regular.ttf"),
    poppinssemibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      checkTokenAndNavigate();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={BASE_COLOR} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Index Screen</Text>
      <ActivityIndicator animating={true} color={BASE_COLOR} />
    </View>
  );
};

export default IndexScreen;

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
