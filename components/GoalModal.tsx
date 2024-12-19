import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { View, TextInput, Modal, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/provider/ThemeProvider";

interface GoalModalProps {
  onAddGoal: (goal: string) => void;
}

export interface GoalModalRef {
  open: () => void;
  close: () => void;
}

const GoalModal = forwardRef<GoalModalRef, GoalModalProps>(
  ({ onAddGoal }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [newGoal, setNewGoal] = useState<string>("");
    const { theme } = useTheme();

    useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => {
        setIsVisible(false);
      },
    }));

    const handleAddGoal = useCallback(() => {
      if (newGoal.trim()) {
        onAddGoal(newGoal);
        setNewGoal("");
        setIsVisible(false);
      }
    }, [newGoal, onAddGoal]);

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View
          //   style={[
          //     styles.container,
          //     { backgroundColor: theme?.background || "white" },
          //   ]}
          style={{
            ...StyleSheet.flatten(styles.container || {}),
            backgroundColor: theme?.background || "white",
          }}
        >
          <TextInput
            placeholder="Add your goal"
            placeholderTextColor="gray"
            value={newGoal}
            style={[styles.input, { color: theme?.text || "black" }]}
            onChangeText={(text) => setNewGoal(text)}
          />
          <Pressable style={styles.addButton} onPress={handleAddGoal}>
            <Ionicons name="checkmark" size={30} color="green" />
          </Pressable>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setIsVisible(false);
              setNewGoal("");
            }}
          >
            <Ionicons name="close" size={30} color="gray" />
          </Pressable>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 30,
    padding: 4,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 50,
  },
});

export default GoalModal;
