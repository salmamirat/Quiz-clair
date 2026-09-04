import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CategorySelector from "../src/components/CategorySelector";
import QuestionCard from "../src/components/QuestionCard";
import ProgressBar from "../src/components/ProgressBar";
import AnswerFeedback from "../src/components/AnswerFeedback";
import ResultCard from "../src/components/ResultCard";
import { getCategories, getQuestionsByCategory } from "../src/services/api";

export default function App() {
  const [gameState, setGameState] = useState("category");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setErrorMessage("Impossible de charger les catégories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  const startQuizForCategory = async (category) => {
    setSelectedCategory(category);
    setLoadingQuestions(true);
    setErrorMessage(null);

    try {
      const categoryKey = category.slug || category.id;
      const data = await getQuestionsByCategory(categoryKey);
      if (!data || data.length === 0) {
        throw new Error("Aucune question trouvée.");
      }
      setQuestions(data);
      setCurrentIndex(0);
      setSelectedOption(null);
      setScore(0);
      setIsCorrect(null);
      setFeedbackVisible(false);
      setGameState("quiz");
    } catch (error) {
      setErrorMessage("Impossible de charger les questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleOptionSelect = (optionIndex, optionText) => {
    if (selectedOption !== null) return;

    const currentQuestion = questions[currentIndex];
    const correct =
      typeof currentQuestion.correctAnswer === "number"
        ? optionIndex === currentQuestion.correctAnswer
        : optionText === currentQuestion.correctAnswer;

    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    setFeedbackVisible(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setFeedbackVisible(false);
      } else {
        setGameState("result");
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCorrect(null);
    setFeedbackVisible(false);
    setGameState("quiz");
  };

  const resetToCategorySelector = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCorrect(null);
    setFeedbackVisible(false);
    setGameState("category");
  };

  if (loadingQuestions) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF7A2F" />
        <Text style={styles.loadingText}>Chargement des questions...</Text>
      </SafeAreaView>
    );
  }

  if (errorMessage) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            if (selectedCategory) {
              startQuizForCategory(selectedCategory);
            } else {
              loadCategories();
            }
          }}
        >
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (gameState === "result") {
    return (
      <SafeAreaView style={styles.resultSafeContainer}>
        <ResultCard
          score={score}
          total={questions.length}
          onRestart={restartQuiz}
          onSelectCategory={resetToCategorySelector}
        />
      </SafeAreaView>
    );
  }

  if (gameState === "quiz") {
    const currentQuestion = questions[currentIndex];

    return (
      <SafeAreaView style={styles.quizContainer}>
        <View style={styles.topQuizHeader}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={resetToCategorySelector}
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerQuizTitle}>Quiz Éclair</Text>
          <View style={styles.placeholderBack} />
        </View>

        <View style={styles.quizContent}>
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={questions.length}
          />

          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              category={selectedCategory}
              selectedOption={selectedOption}
              onSelectOption={handleOptionSelect}
            />
          )}

          <AnswerFeedback isCorrect={isCorrect} visible={feedbackVisible} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CategorySelector
        categories={categories}
        loading={loadingCategories}
        onSelectCategory={startQuizForCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FBF9F5"
  },
  quizContainer: {
    flex: 1,
    backgroundColor: "#FBF9F5",
    justifyContent: "flex-start"
  },
  resultSafeContainer: {
    flex: 1,
    backgroundColor: "#172033"
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#FBF9F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600"
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: "#FF7A2F",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  topQuizHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderBack: {
    width: 40
  },
  headerQuizTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2BA169"
  },
  quizContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    zIndex: 2
  }
});
