import ThemeProvider from "@/provider/ThemeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function StackLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(grouping)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="index" /> */}
          {/* <Stack.Screen name="/goals/[id]" /> */}
        </Stack>
        {/* <StatusBa style="auto" /> */}
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
