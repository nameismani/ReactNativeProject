import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatTime } from "@/libs/helpers";

export interface GoalsType {
  id: number;
  goalName: string;
  goalIsCompleted: boolean;
  createdAt: number;
}
export default function Goals() {
  const [goals, setGoals] = useState<GoalsType[]>([
    {
      id: 1,
      goalName: "Learn React Native",
      goalIsCompleted: false,
      createdAt: Date.now(),
    },
  ]);
  const [newGoal, setNewGoal] = useState<string>("");
  const styles = createStyles();

  const addGoal = () => {
    if (!newGoal.trim()) {
      return;
    }
    const id = goals?.length > 0 ? goals[goals.length - 1]?.id + 1 : 1;
    const newGoalObject: GoalsType = {
      id,
      goalName: newGoal,
      goalIsCompleted: false,
      createdAt: Date.now(),
    };
    setGoals((prev) => [...(prev ?? {}), newGoalObject]);
    setNewGoal("");
  };

  const updateGoal = (id: number) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? { ...goal, goalIsCompleted: !goal.goalIsCompleted }
        : goal
    );
    setGoals(updatedGoals);
  };
  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id != id));
  };
  const renderItem = ({ item }: any) => {
    // const formattedDate = dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
    const timeAgo = formatTime(item.createdAt);
    return (
      <View style={styles.goalContainer}>
        <View style={styles.goal}>
          <Text
            style={{
              ...styles.goalText,
              ...(item?.goalIsCompleted ? styles?.goalCompletedText : {}),
            }}
            onPress={() => updateGoal(item.id)}
          >
            {item.goalName}
          </Text>
          <Pressable onPress={() => deleteGoal(item.id)}>
            <MaterialCommunityIcons
              name="delete-circle"
              size={36}
              color="red"
              selectable={undefined}
            />
          </Pressable>
        </View>
        <Text style={styles.goalCreatedTime}>{timeAgo}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add your goal"
          placeholderTextColor="gray"
          value={newGoal}
          // secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setNewGoal(text)}
        />
        {/* <Button title="check"  /> */}
        <Pressable style={styles.addButton} onPress={addGoal}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={goals}
        // renderItem={(goal) => <></>}
        renderItem={renderItem}
        keyExtractor={(goal) => goal.id.toString()}
      />
    </SafeAreaView>
  );
}

const createStyles = () => {
  return StyleSheet.create({
    viewContainer: {
      // height: "100%",
      flex: 1,
      // justifyContent: "center",
      // width: "100%",
      backgroundColor: "black",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024, // ipad pro size
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      color: "white",
    },
    addButton: {
      backgroundColor: "white",
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: "black",
    },
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
      color: "white",
    },
    goalCompletedText: {
      textDecorationLine: "line-through",
      textDecorationColor: "red",
    },
    goalCreatedTime: {
      color: "white",
      marginInlineStart: "auto",
      marginTop: 10,
      marginEnd: 5,
    },
  });
};
