import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/provider/ThemeProvider"; // For theme support
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TabBarBackground from "@/app-example/components/ui/TabBarBackground";
import { Platform } from "react-native";
export default function GroupingLayout() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: theme?.tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        {/* Goals Tab */}
        <Tabs.Screen
          name="goals" // Points to goals/main.tsx
          options={{
            title: "Goals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-done" size={size || 28} color={color} />
            ),
          }}
        />

        {/* Chats Tab */}
        <Tabs.Screen
          name="chat" // Points to chats/index.tsx
          options={{
            title: "Chats",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="mark-unread-chat-alt"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
