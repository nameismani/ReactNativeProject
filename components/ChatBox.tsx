import React, { memo } from "react";
import { View, Text } from "react-native";
import { Message } from "./Main";

import { useTheme } from "@/provider/ThemeProvider"; // Import useTheme hook
import createChatStyles from "@/styles/chatStyles";

const ChatBox = ({ type, value }: Message) => {
  const { theme, colorScheme } = useTheme(); // Access theme and colorScheme
  const chatStyles = createChatStyles(theme, colorScheme); // Generate styles dynamically

  return (
    <View
      style={[
        chatStyles.chatMessage,
        type === "user" ? chatStyles.userMessage : chatStyles.aiMessage,
      ]}
    >
      <Text style={type === "user" ? chatStyles.userText : chatStyles.aiText}>
        {value}
      </Text>
    </View>
  );
};

export default memo(ChatBox);
