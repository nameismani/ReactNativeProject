import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/provider/ThemeProvider";
import ChatBox from "./ChatBox";
import createChatStyles from "@/styles/chatStyles";

export interface Message {
  type: "user" | "ai";
  value: string;
}

const Main = () => {
  const { theme, colorScheme } = useTheme();
  const chatStyles = createChatStyles(theme, colorScheme);

  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQueryResponse = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", value: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await fetch(
        "https://personal-assistant-sigma-ashen.vercel.app/api/groq",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        }
      ).then((res) => res.json());

      const aiMessage: Message = { type: "ai", value: aiResponse.content };
      setConversation((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={chatStyles.container}>
      <View style={chatStyles.header}>
        <Text style={chatStyles.headerText}>Mani's Personal Assistant</Text>
      </View>
      <FlatList
        data={conversation}
        renderItem={({ item }) => <ChatBox {...item} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={chatStyles.chatBox}
      />
      {isLoading && (
        <ActivityIndicator
          style={chatStyles.loader}
          size="large"
          color={theme?.button}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={chatStyles.inputContainer}
      >
        <TextInput
          style={chatStyles.input}
          placeholder="Enter your message"
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={fetchQueryResponse}
        />
        <TouchableOpacity
          onPress={fetchQueryResponse}
          style={chatStyles.sendButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme?.background} />
          ) : (
            <Ionicons name="send" size={24} color={theme?.background} />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Main;
