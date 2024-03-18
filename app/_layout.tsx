import { Stack } from "expo-router";
import { createContext } from "react";
import { LanguageContext, LanguageProvider } from "../LanguageContext";
const RootLayout = () => {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
};

export default RootLayout;
