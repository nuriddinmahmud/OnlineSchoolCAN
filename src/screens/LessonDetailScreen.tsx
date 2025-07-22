import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLessons } from "../features/lessons/service/useLessons";
import { useVideoPlayer, VideoView } from "expo-video";

const LessonDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId, courseId } = route.params as {
    lessonId: string;
    courseId?: string;
  };

  const { getLesson } = useLessons();
  const { data, isLoading, error } = getLesson(lessonId, courseId);

  const lessonUrl = data?.lesson?.video_url ?? null;
  const player = useVideoPlayer(lessonUrl);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: 500 }}>Загрузка...</Text>
      </View>
    );
  }
  if (error || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: 500 }}>
          Ошибка загрузки урока
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
          {error?.message || "Данные не найдены"}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Назад</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Feather name="book" size={20} color="#22c55e" />
          <Text style={styles.title}>{data?.lesson?.title}</Text>
          <View style={styles.testBadge}>
            <Ionicons name="document-text-outline" size={14} color="#000" />
            <Text style={styles.testBadgeText}>Тест</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.duration}>{data?.lesson?.duration}</Text>
        </View>
        <Text style={styles.description}>{data?.lesson?.description}</Text>
        <View style={styles.videoPreview}>
          <VideoView
            player={player}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
            nativeControls
            contentFit="contain"
          />
        </View>
      </View>
      <View style={styles.testContainer}>
        <TouchableOpacity style={styles.testButton}>
          <Ionicons name="document-text-outline" size={18} color="#2563eb" />
          <Text style={styles.testButtonText}>Пройти тест</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  testContainer: {
    width: "40%",
    marginLeft: 20,
    marginBottom: 20,
  },
  testBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  testBadgeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
  },
  videoPreview: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 18,
    marginTop: 8,
  },
  videoImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  playButtonOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#2563eb",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: "center",
    marginTop: 8,
  },
  testButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  sidebarContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#222",
    marginBottom: 12,
  },
  sidebarLessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    opacity: 1,
  },
  sidebarLessonCardActive: {
    backgroundColor: "#e0f2fe",
    borderColor: "#38bdf8",
    borderWidth: 1.5,
    opacity: 1,
  },
  sidebarLessonCardLocked: {
    backgroundColor: "#f1f5f9",
    opacity: 0.6,
  },
  sidebarLessonNumber: {
    fontWeight: "bold",
    color: "#2563eb",
    marginRight: 6,
    fontSize: 15,
  },
  sidebarLessonTitle: {
    fontSize: 15,
    color: "#222",
  },
  sidebarLessonTitleActive: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  sidebarLessonTitleLocked: {
    color: "#cbd5e1",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    elevation: 2,
    zIndex: 10,
  },
  headerBackBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    flex: 1,
    textAlign: "left",
  },
});

export default LessonDetailScreen;
