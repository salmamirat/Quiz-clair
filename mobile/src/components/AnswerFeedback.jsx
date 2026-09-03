import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AnswerFeedback({ isCorrect, visible }) {
  if (!visible || isCorrect === null) {
    return <View style={styles.placeholder} />;
  }

  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.correctContainer : styles.incorrectContainer
      ]}
    >
      <Ionicons
        name={isCorrect ? "checkmark-circle" : "close-circle"}
        size={20}
        color={isCorrect ? "#15803D" : "#B91C1C"}
        style={styles.icon}
      />
      <Text style={[styles.text, isCorrect ? styles.correctText : styles.incorrectText]}>
        {isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse ! 😢"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 52,
    marginVertical: 16
  },
  container: {
    height: 52,
    marginVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1.5
  },
  correctContainer: {
    backgroundColor: "#EBF8F1",
    borderColor: "#2BA169"
  },
  incorrectContainer: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444"
  },
  icon: {
    marginRight: 8
  },
  text: {
    fontSize: 15,
    fontWeight: "700"
  },
  correctText: {
    color: "#15803D"
  },
  incorrectText: {
    color: "#B91C1C"
  }
});
