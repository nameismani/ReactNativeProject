import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoalsType } from "..";
import { useTheme } from "@/provider/ThemeProvider";
import { ThemeType } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const EditGoal = () => {
  const { id } = useLocalSearchParams();
  const [goal, setGoal] = useState<GoalsType>();
  const { theme, colorScheme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Goals");
        const storedGoals = jsonValue != null ? JSON.parse(jsonValue) : null;
        const goal = storedGoals.find(
          (goal: GoalsType) => goal.id == Number(id)
        );
        setGoal(goal);
        // console.log(goal);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  const handleSave = async () => {
    try {
      const saveGoal = { ...goal, goalName: goal?.goalName };
      const jsonValue = await AsyncStorage.getItem("Goals");
      const storedGoals = jsonValue != null ? JSON.parse(jsonValue) : null;
      const updatedGoal = storedGoals.map((goal: GoalsType) =>
        goal.id == Number(id) ? saveGoal : goal
      );
      console.log(saveGoal);
      await AsyncStorage.setItem("Goals", JSON.stringify(updatedGoal));
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Edit todo"
          placeholderTextColor="gray"
          value={goal?.goalName || ""}
          onChangeText={(text) =>
            setGoal((prev) => ({
              ...(prev ?? {}),
              goalName: text,
              id: prev?.id ?? 0,
            }))
          }
        />
        {/* <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          style={{ marginLeft: 10 }}
        >
          <Octicons
            name={colorScheme === "dark" ? "moon" : "sun"}
            size={36}
            color={theme.text}
            selectable={undefined}
            style={{ width: 36 }}
          />
        </Pressable> */}
      </View>
      <View style={styles.inputContainer}>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "white" }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
};

export default EditGoal;

function createStyles(
  theme: ThemeType | undefined,
  colorScheme: "light" | "dark" | null | undefined
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme?.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 6,
      width: "100%",
      maxWidth: 1024,
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
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme?.text,
    },
    saveButton: {
      backgroundColor: theme?.button,
      borderRadius: 5,
      padding: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
  });
}
