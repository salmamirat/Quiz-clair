import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

export default function CategorySelector({ categories = [], onSelectCategory, loading = false }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.topBadgeLeft}>
          <Ionicons name="flash" size={18} color="#FFFFFF" />
        </View>
        <View style={styles.topBadgeRight}>
          <Ionicons name="settings-outline" size={18} color="#D97706" />
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Quiz Éclair</Text>
          <Text style={styles.titleEmoji}>⚡</Text>
        </View>
        <Text style={styles.subtitle}>
          Choisis une catégorie et commence à tester tes connaissances !
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF7A2F" />
        </View>
      ) : (
        <View style={styles.categoriesList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id || category.slug}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(category)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: category.bgColor || "#FFF3EB" }
                ]}
              >
                <Text style={styles.categoryEmoji}>{category.icon || "📚"}</Text>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>
                  {category.name || category.title}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {category.questionsCount || 5} questions
                </Text>
              </View>

              <View
                style={[
                  styles.arrowButton,
                  { backgroundColor: category.color || "#FF7A2F" }
                ]}
              >
                <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.bottomWaveContainer} pointerEvents="none">
        <Svg width="100%" height={120} viewBox="0 0 375 120" preserveAspectRatio="none">
          <Path
            d="M0,70 C90,30 160,95 240,55 C290,30 340,50 375,35 L375,120 L0,120 Z"
            fill="#2BA169"
          />
          <Path
            d="M0,50 C60,20 120,70 180,95 C140,110 50,115 0,105 Z"
            fill="#1E293B"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F5",
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: "space-between"
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  topBadgeLeft: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FF7A2F",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#FF7A2F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  topBadgeRight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    alignItems: "center",
    marginBottom: 32
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E293B"
  },
  titleEmoji: {
    fontSize: 24,
    marginLeft: 6
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  categoriesList: {
    gap: 16,
    zIndex: 2
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 3,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  categoryEmoji: {
    fontSize: 24
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#94A3B8"
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomWaveContainer: {
    width: "100%",
    position: "relative",
    bottom: -10,
    marginTop: "auto"
  }
});
