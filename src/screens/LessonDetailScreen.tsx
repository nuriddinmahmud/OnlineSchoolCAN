import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

const LessonDetailScreen = () => {
  const route = useRoute();
  const {
    lesson,
    allLessons = [],
    currentLessonIndex = 0,
  } = route.params as any;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Feather name="book" size={20} color="#22c55e" />
          <Text style={styles.title}>{lesson.title}</Text>
          <View style={styles.testBadge}>
            <Ionicons name="document-text-outline" size={14} color="#000" />
            <Text style={styles.testBadgeText}>Тест</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.duration}>{lesson.duration}</Text>
        </View>
        <Text style={styles.description}>{lesson.description}</Text>
        <View style={styles.videoPreview}>
          <Image
            source={{
              uri: lesson.image_url || "https://placehold.co/320x120/png",
            }}
            style={styles.videoImage}
          />
          <View style={styles.playButtonOverlay}>
            <Ionicons name="play-circle" size={48} color="#fff" />
          </View>
        </View>
      </View>
      <View style={styles.testContainer}>
        <TouchableOpacity style={styles.testButton}>
          <Ionicons name="document-text-outline" size={18} color="#2563eb" />
          <Text style={styles.testButtonText}>Пройти тест</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sidebarContainer}>
        <Text style={styles.sidebarTitle}>Содержание курса</Text>
        {allLessons.map((l: any, idx: number) => {
          const isCurrent = idx === currentLessonIndex;
          const isLocked = idx > currentLessonIndex;
          return (
            <View
              key={l.id || idx}
              style={[
                styles.sidebarLessonCard,
                isCurrent && styles.sidebarLessonCardActive,
                isLocked && styles.sidebarLessonCardLocked,
              ]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isLocked ? (
                  <Feather
                    name="lock"
                    size={16}
                    color="#cbd5e1"
                    style={{ marginRight: 6 }}
                  />
                ) : (
                  <Text style={styles.sidebarLessonNumber}>{idx + 1}.</Text>
                )}
                <Text
                  style={[
                    styles.sidebarLessonTitle,
                    isCurrent && styles.sidebarLessonTitleActive,
                    isLocked && styles.sidebarLessonTitleLocked,
                  ]}>
                  {l.title}
                </Text>
                {l.has_test && !isLocked && (
                  <Ionicons
                    name="document-text-outline"
                    size={16}
                    color="#000"
                    style={{ marginLeft: 6 }}
                  />
                )}
              </View>
            </View>
          );
        })}
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
});

export default LessonDetailScreen;
