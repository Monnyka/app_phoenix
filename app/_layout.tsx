import { Stack } from "expo-router";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="taskdetails" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
