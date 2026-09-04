import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function ResultCard({ score, total, onRestart, onSelectCategory }) {
  const percentage = Math.round((score / total) * 100);

  const size = 130;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const getMessage = () => {
    if (score === total) {
      return "Score parfait ! Tu maîtrises parfaitement ce sujet ! 🏆";
    }
    if (score >= 3) {
      return "Excellent travail ! Continue ainsi et reviens pour battre ton record ! 💪";
    }
    return "Pas mal ! Entraîne-toi encore pour améliorer ton score ! 🚀";
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.trophyContainer}>
          <Text style={styles.trophyEmoji}>🏆</Text>
        </View>
        <View style={styles.starsDecor}>
          <View style={[styles.confetti, { top: 20, left: 40, backgroundColor: "#2BA169", transform: [{ rotate: "45deg" }] }]} />
          <View style={[styles.confetti, { top: 30, right: 50, backgroundColor: "#3B82F6", transform: [{ rotate: "-25deg" }] }]} />
          <View style={[styles.confetti, { top: 80, left: 20, backgroundColor: "#8B5CF6", transform: [{ rotate: "15deg" }] }]} />
          <View style={[styles.confetti, { top: 70, right: 30, backgroundColor: "#F59E0B", transform: [{ rotate: "-40deg" }] }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Bravo !</Text>
        <Text style={styles.subtitle}>Quiz terminé 🎉</Text>

        <View style={styles.gaugeContainer}>
          <Svg width={size} height={size}>
            <Circle
              stroke="#FEE8D6"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke="#FF7A2F"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreNumber}>
              {score}/{total}
            </Text>
            <Text style={styles.scoreLabel}>Ton score</Text>
          </View>
        </View>

        <Text style={styles.messageText}>{getMessage()}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onRestart}
          >
            <Ionicons name="refresh" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Recommencer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={onSelectCategory}
          >
            <Text style={styles.secondaryButtonText}>Choisir une catégorie</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#172033",
    justifyContent: "space-between"
  },
  topSection: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  trophyContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center"
  },
  trophyEmoji: {
    fontSize: 54
  },
  starsDecor: {
    ...StyleSheet.absoluteFillObject
  },
  confetti: {
    position: "absolute",
    width: 8,
    height: 16,
    borderRadius: 3
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 28,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 20
  },
  gaugeContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  scoreTextContainer: {
    position: "absolute",
    alignItems: "center"
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B"
  },
  scoreLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 2
  },
  messageText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 16,
    paddingHorizontal: 12
  },
  buttonsContainer: {
    width: "100%",
    gap: 12
  },
  primaryButton: {
    backgroundColor: "#FF7A2F",
    borderRadius: 24,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#FF7A2F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  buttonIcon: {
    marginRight: 8
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    backgroundColor: "#F8FAFC",
    borderRadius: 24,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  secondaryButtonText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600"
  }
});
