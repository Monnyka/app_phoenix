import { Stack } from "expo-router";
import { createContext } from "react";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <LanguageProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="main"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="taskdetails" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </LanguageProvider>
  );
};

export default RootLayout;
