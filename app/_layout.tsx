import ThemeProvider from "@/provider/ThemeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          <Stack.Screen name="index" />
          <Stack.Screen name="/goals/[id]" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
