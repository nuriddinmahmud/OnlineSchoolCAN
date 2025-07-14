import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AppDispatch, RootState } from "../store";
import {
  submitAssessment,
  clearAssessmentResult,
} from "../store/slices/lessonsSlice";

interface AssessmentModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
  lessonId: number;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({
  visible,
  onClose,
  onComplete,
  lessonId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { assessment, assessmentResult, isLoading } = useSelector(
    (state: RootState) => state.lessons
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number[];
  }>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (visible) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      dispatch(clearAssessmentResult());
    }
  }, [visible, dispatch]);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const currentQuestion = assessment?.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    if (currentQuestion.type === "multiple_choice") {
      const currentAnswers = selectedAnswers[questionId] || [];
      const isSelected = currentAnswers.includes(optionIndex);

      let newAnswers: number[];
      if (currentQuestion.correctAnswer.length === 1) {
        newAnswers = [optionIndex];
      } else {
        if (isSelected) {
          newAnswers = currentAnswers.filter((index) => index !== optionIndex);
        } else {
          newAnswers = [...currentAnswers, optionIndex];
        }
      }

      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: newAnswers,
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (assessment?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    const answers = assessment.questions.map((question) => ({
      questionId: question.id,
      selectedOptions: selectedAnswers[question.id] || [],
    }));

    const unansweredQuestions = answers.filter(
      (answer) => answer.selectedOptions.length === 0
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        "Incomplete Assessment",
        `Please answer all questions before submitting. ${unansweredQuestions.length} question(s) remain unanswered.`
      );
      return;
    }

    try {
      await dispatch(submitAssessment({ lessonId, answers })).unwrap();
      setShowResults(true);
    } catch (error) {
      Alert.alert("Error", "Failed to submit assessment. Please try again.");
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!assessment) {
    return null;
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Assessment</Text>
          <View style={styles.placeholder} />
        </View>

        {showResults && assessmentResult ? (
          <ScrollView style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.scoreText}>
                Score: {assessmentResult.score}%
              </Text>
              <Text style={styles.resultText}>
                {assessmentResult.passed ? "Passed!" : "Failed"}
              </Text>
              <Text style={styles.resultDetails}>
                {assessmentResult.correctAnswers} of{" "}
                {assessmentResult.totalQuestions} correct
              </Text>
            </View>

            <View style={styles.resultsList}>
              {assessmentResult.results.map((result, index) => {
                const question = assessment.questions.find(
                  (q) => q.id === result.questionId
                );
                return (
                  <View key={result.questionId} style={styles.resultItem}>
                    <Text style={styles.resultQuestionText}>
                      {index + 1}. {question?.question}
                    </Text>
                    <View style={styles.resultStatus}>
                      <Ionicons
                        name={
                          result.correct ? "checkmark-circle" : "close-circle"
                        }
                        size={20}
                        color={result.correct ? "#28a745" : "#dc3545"}
                      />
                      <Text
                        style={[
                          styles.resultStatusText,
                          { color: result.correct ? "#28a745" : "#dc3545" },
                        ]}>
                        {result.correct ? "Correct" : "Incorrect"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}>
              <Text style={styles.completeButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>
                {currentQuestionIndex + 1} of {assessment.questions.length}
              </Text>
            </View>

            <ScrollView style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = (
                    selectedAnswers[currentQuestion.id] || []
                  ).includes(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        isSelected && styles.selectedOption,
                      ]}
                      onPress={() =>
                        handleAnswerSelect(currentQuestion.id, index)
                      }>
                      <View
                        style={[
                          styles.optionIndicator,
                          isSelected && styles.selectedIndicator,
                        ]}>
                        {isSelected && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText,
                        ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentQuestionIndex === 0 && styles.disabledButton,
                ]}
                onPress={handlePrevious}
                disabled={currentQuestionIndex === 0}>
                <Text
                  style={[
                    styles.navButtonText,
                    currentQuestionIndex === 0 && styles.disabledButtonText,
                  ]}>
                  Previous
                </Text>
              </TouchableOpacity>

              {currentQuestionIndex === assessment.questions.length - 1 ? (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={handleSubmit}
                  disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                  <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedOption: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  optionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedIndicator: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  navButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#ccc",
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultDetails: {
    fontSize: 16,
    color: "#666",
  },
  resultsList: {
    gap: 12,
  },
  resultItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  resultQuestionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  resultStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultStatusText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AssessmentModal;
