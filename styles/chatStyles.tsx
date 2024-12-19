import { ThemeType } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const createChatStyles = (
  theme: ThemeType | undefined,
  colorScheme: "light" | "dark" | null | undefined
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    header: {
      backgroundColor: colorScheme === "light" ? "#6200EA" : "#1F1B24",
      padding: 16,
      alignItems: "center",
    },
    headerText: {
      color: colorScheme === "light" ? "#FFFFFF" : "#F4F4F8",
      fontSize: 18,
      fontWeight: "bold",
    },
    chatBox: {
      flexGrow: 1,
      padding: 16,
      paddingBottom: 8,
    },
    chatMessage: {
      maxWidth: "70%",
      padding: 12,
      marginBottom: 8,
      borderRadius: 16,
      // backgroundColor:
      //   colorScheme === "light" ? theme?.background : theme?.text,
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: theme?.button,
    },
    aiMessage: {
      alignSelf: "flex-start",
      backgroundColor: theme?.icon,
    },
    userText: {
      color: theme?.background, // User's text matches background contrast
    },
    aiText: {
      color: theme?.text, // AI's text matches primary text color
    },
    loader: {
      marginVertical: 8,
      alignSelf: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colorScheme === "light" ? "#DDD" : "#555", // Light and dark variations
      backgroundColor: theme?.background,
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme?.text,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: theme?.background,
      color: theme?.text,
    },
    sendButton: {
      padding: 12,
      backgroundColor: theme?.button,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default createChatStyles;
