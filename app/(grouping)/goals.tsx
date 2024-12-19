import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { formatTime } from "@/libs/helpers";
import { useTheme } from "@/provider/ThemeProvider";
import { ThemeType } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import GoalModal, { GoalModalRef } from "@/components/GoalModal";
import GoalItem from "@/components/GoalItem";

export interface GoalsType {
  id: number;
  goalName: string;
  goalIsCompleted?: boolean;
  createdAt?: number;
}
export default function GoalsScreen() {
  const [goals, setGoals] = useState<GoalsType[]>([]);
  const [searchGoal, setSearchGoal] = useState<string>("");
  const { colorScheme, setColorScheme, theme } = useTheme();
  const goalModalRef = useRef<GoalModalRef>(null);
  const keys = ["goalName"];
  const styles = createStyles(theme, colorScheme);

  const filteredGoals = goals.filter((goal) =>
    keys.some((key) =>
      goal[key as keyof GoalsType]
        ?.toString()
        ?.toLowerCase()
        .includes(searchGoal.toLowerCase())
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Goals");
        const storedGoals = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storedGoals && storedGoals.length) {
          setGoals(storedGoals);
        } else {
          setGoals([
            {
              id: 1,
              goalName: "Learn React Native",
              goalIsCompleted: false,
              createdAt: Date.now(),
            },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(goals);
        await AsyncStorage.setItem("Goals", jsonValue);
      } catch (e) {
        console.error(e);
      }
    };

    storeData();
  }, [goals]);
  const addGoal = (newGoal: string) => {
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
  const renderItem = ({ item }: any) => (
    <GoalItem item={item} updateGoal={updateGoal} deleteGoal={deleteGoal} />
  );
  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search your goal"
          placeholderTextColor="gray"
          value={searchGoal}
          // secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setSearchGoal(text)}
        />
        {/* <Button title="check"  /> */}
        <Pressable
          style={styles.addButton}
          onPress={() => goalModalRef.current?.open()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <Animated.FlatList
        data={filteredGoals}
        // renderItem={(goal) => <></>}
        renderItem={renderItem}
        keyExtractor={(goal) => goal.id.toString()}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode={"on-drag"}
      />
      <GoalModal ref={goalModalRef} onAddGoal={addGoal} />
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

const createStyles = (
  theme: ThemeType | undefined,
  colorScheme: "light" | "dark" | null | undefined
) => {
  return StyleSheet.create({
    viewContainer: {
      // height: "100%",
      flex: 1,
      // justifyContent: "center",
      // width: "100%",
      backgroundColor: theme?.background,
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
      color: theme?.text,
    },
    addButton: {
      backgroundColor: theme?.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme == "dark" ? "black" : "white",
    },
  });
};
