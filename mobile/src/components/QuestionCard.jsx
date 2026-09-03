import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QuestionCard({
  question,
  category,
  selectedOption,
  onSelectOption
}) {
  const isAnswered = selectedOption !== null;

  return (
    <View style={styles.container}>
      {category && (
        <View style={styles.categoryBadgeContainer}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: category.bgColor || "#EBF8F1" }
            ]}
          >
            <Text style={styles.categoryEmoji}>{category.icon || "🧠"}</Text>
          </View>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsList}>
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect =
              typeof question.correctAnswer === "number"
                ? index === question.correctAnswer
                : option === question.correctAnswer;

            let cardStyle = styles.optionCard;
            let textStyle = styles.optionText;
            let iconElement = null;

            if (isAnswered) {
              if (isSelected && isCorrect) {
                cardStyle = [styles.optionCard, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextCorrect];
                iconElement = (
                  <View style={styles.feedbackIconCircle}>
                    <Ionicons name="checkmark-circle" size={22} color="#2BA169" />
                  </View>
                );
              } else if (isSelected && !isCorrect) {
                cardStyle = [styles.optionCard, styles.optionIncorrect];
                textStyle = [styles.optionText, styles.optionTextIncorrect];
                iconElement = (
                  <View style={styles.feedbackIconCircle}>
                    <Ionicons name="close-circle" size={22} color="#EF4444" />
                  </View>
                );
              } else if (!isSelected && isCorrect) {
                cardStyle = [styles.optionCard, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextCorrect];
                iconElement = (
                  <View style={styles.feedbackIconCircle}>
                    <Ionicons name="checkmark-circle" size={22} color="#2BA169" />
                  </View>
                );
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={cardStyle}
                activeOpacity={0.7}
                disabled={isAnswered}
                onPress={() => onSelectOption(index, option)}
              >
                <Text style={textStyle}>{option}</Text>
                {iconElement}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  categoryBadgeContainer: {
    marginBottom: -22,
    zIndex: 10
  },
  categoryBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  categoryEmoji: {
    fontSize: 20
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 3,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12
  },
  questionText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24
  },
  optionsList: {
    gap: 12
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  optionCorrect: {
    borderColor: "#2BA169",
    backgroundColor: "#EBF8F1"
  },
  optionIncorrect: {
    borderColor: "#EF4444",
    backgroundColor: "#FEE2E2"
  },
  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    flex: 1
  },
  optionTextCorrect: {
    color: "#15803D"
  },
  optionTextIncorrect: {
    color: "#B91C1C"
  },
  feedbackIconCircle: {
    marginLeft: 8
  }
});
