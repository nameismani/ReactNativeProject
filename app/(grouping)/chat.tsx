import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Main from "@/components/Main";
import { useTheme } from "@/provider/ThemeProvider"; // Import useTheme hook

const ChatScreen = () => {
  const { theme } = useTheme(); // Access theme for background color

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.background }]}
    >
      <Main />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
