import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { formatTime } from "@/libs/helpers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/provider/ThemeProvider";
import { ThemeType } from "@/constants/Colors";
import { useRouter } from "expo-router";

export interface GoalItemProps {
  item: any;
  updateGoal: (id: number) => void;
  deleteGoal: (id: number) => void;
}

const GoalItem = ({ item, updateGoal, deleteGoal }: GoalItemProps) => {
  // const formattedDate = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
  const timeAgo = formatTime(item.createdAt);
  const { colorScheme, setColorScheme, theme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  const router = useRouter();
  return (
    <View style={styles.goalContainer}>
      <View style={styles.goal}>
        <Pressable
          onLongPress={() => updateGoal(item.id)}
          onPress={() => router.push(`/goals/${item.id}`)}
        >
          <Text
            style={{
              ...styles.goalText,
              ...(item?.goalIsCompleted ? styles?.goalCompletedText : {}),
            }}
          >
            {item.goalName}
          </Text>
        </Pressable>
        <Pressable onPress={() => deleteGoal(item.id)}>
          <MaterialCommunityIcons
            name="delete-circle"
            size={36}
            color="red"
            selectable={undefined}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        {/* <Text style={styles.goalCreatedTime}>{timeAgo}</Text> */}
        <ThemedText type="default" style={styles.goalCreatedTime}>
          {timeAgo}
        </ThemedText>
      </View>
    </View>
  );
};

export default GoalItem;

const createStyles = (
  theme: ThemeType | undefined,
  colorScheme: "light" | "dark" | null | undefined
) => {
  return StyleSheet.create({
    goalContainer: {
      padding: 10,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
    },
    goal: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 4,

      width: "100%",
      maxWidth: 1024, // ipad pro size
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    goalText: {
      fontSize: 18,
      color: theme?.text,
    },
    goalCompletedText: {
      textDecorationLine: "line-through",
      textDecorationColor: "red",
      color: "gray",
    },
    goalCreatedTime: {
      color: theme?.text,

      marginTop: 10,
      marginEnd: 5,
    },
  });
};
