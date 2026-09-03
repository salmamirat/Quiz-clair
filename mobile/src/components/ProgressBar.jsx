import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ currentIndex, totalQuestions }) {
  const currentNumber = currentIndex + 1;
  const percentage = Math.round((currentNumber / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.stepText}>
          Question {currentNumber}/{totalQuestions}
        </Text>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  stepText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B"
  },
  percentText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B"
  },
  track: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    backgroundColor: "#2BA169",
    borderRadius: 4
  }
});
