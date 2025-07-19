import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useCourses } from "../features/courses/service/useCourses";

const CourseDetailScreen = () => {
  const route = useRoute();
  const { courseId } = route.params as { courseId: string };
  const { getCourse } = useCourses();
  const { data, isLoading, error } = getCourse(courseId);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          Ошибка загрузки курса
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Назад</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.badgesRow}>
          {data?.course?.category && (
            <View style={[styles.badge, styles.badgeCategory]}>
              <Text style={[styles.badgeText, styles.badgeTextCategory]}>
                {data.course.category}
              </Text>
            </View>
          )}
          {data?.course?.level && (
            <View style={[styles.badge, styles.badgeLevel]}>
              <Text style={[styles.badgeText, styles.badgeTextLevel]}>
                {data.course.level}
              </Text>
            </View>
          )}
          {data?.course?.is_free && (
            <View style={[styles.badge, styles.badgeFree]}>
              <Text style={[styles.badgeText, styles.badgeTextFree]}>
                Бесплатно
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{data?.course?.title}</Text>
        <Text style={styles.description}>{data?.course?.description}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.metaText}>{data?.course?.instructor}</Text>
          <Ionicons
            name="time-outline"
            size={16}
            color="#666"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.metaText}>{data?.course?.duration}</Text>
          <Ionicons
            name="star"
            size={16}
            color="#FFC107"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.metaText}>
            {data?.course?.rating} (0 отзывов)
          </Text>
        </View>
        <View>
          {!enrolled ? (
            <TouchableOpacity
              style={styles.enrollButton}
              onPress={() => setEnrolled(true)}>
              <Text style={styles.enrollButtonText}>Записаться на курс</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.enrollButton,
                  { backgroundColor: "#000", marginBottom: 10 },
                ]}
                onPress={() => {
                  if (data?.course?.lessons && data.course.lessons.length > 0) {
                    const firstLesson = data.course.lessons[0];
                    navigation.navigate("LessonDetail", {
                      lessonId:
                        firstLesson.id ||
                        firstLesson.lessonId ||
                        firstLesson._id,
                      courseId: courseId,
                    });
                  }
                }}>
                <Text style={styles.enrollButtonText}>Начать обучение</Text>
              </TouchableOpacity>
              <View style={styles.progress}>
                <Text style={styles.progressContainerText}>Прогресс курса</Text>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>
            </>
          )}
        </View>
        <View style={styles.sectionBox}>
          <View style={styles.sectionBoxTitleandIcon}>
            <Feather name="book" size={25} color="#000" />
            <Text style={styles.sectionTitle}>Содержание курса</Text>
          </View>
          {Array.isArray(data?.course?.lessons) &&
            data.course.lessons.length > 0 && (
              <View
                style={{
                  marginBottom: 20,
                  gap: 20,
                }}>
                {data.course.lessons.map((lesson: any, idx: number) => (
                  <View key={lesson.id || idx} style={styles.lessonCard}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}>
                      <Text style={styles.lessonTitle}>
                        {idx + 1}. {lesson.title}
                      </Text>
                      <Ionicons
                        name="videocam-outline"
                        size={16}
                        color="#3b82f6"
                        style={{ marginLeft: 6, marginRight: 4 }}
                      />
                      <Text style={styles.lessonDuration}>
                        {lesson.duration}
                      </Text>
                    </View>
                    <Text style={styles.lessonDescription}>
                      {lesson.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}
        </View>

        <View style={styles.sectionBoxInfo}>
          <Text style={styles.sectionBoxTitle}>Информация о курсе</Text>
          <Text style={styles.infoRow}>
            <Text style={styles.infoLabel}>Уровень: </Text>
            {data?.course?.level}
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.infoLabel}>Длительность: </Text>
            {data?.course?.duration}
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.infoLabel}>Количество уроков: </Text>3 уроков
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.infoLabel}>Преподаватель: </Text>
            {data?.course?.instructor}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  badgesRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 5,
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  badgeFree: {
    backgroundColor: "#22c55e",
  },
  badgeLevel: {
    backgroundColor: "#e0e7ff",
  },
  badgeCategory: {
    backgroundColor: "#e0f7fa",
  },
  badgeText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "bold",
  },
  badgeTextFree: {
    color: "#fff",
  },
  badgeTextLevel: {
    color: "#1e40af",
  },
  badgeTextCategory: {
    color: "#007AFF",
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: "#4b5563",
    marginBottom: 16,
    fontWeight: 400,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  enrollButton: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  enrollButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#020817",
  },
  sectionBoxInfo: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    gap: 5,
    marginBottom: 50,
  },
  sectionBoxTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#020817",
    marginBottom: 10,
  },
  sectionBoxTitleandIcon: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    gap: 8,
  },
  lessonCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  lessonDuration: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  infoRow: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 27,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: "#111827",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  progressContainer: {
    height: 30,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  progressBar: {
    height: 30,
    backgroundColor: "#000",
    borderRadius: 20,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  progressText: {
    zIndex: 2,
    color: "#111827",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "auto",
    marginRight: 8,
  },
  progressContainerText: {
    fontSize: 16,
    fontWeight: 500,
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

export default CourseDetailScreen;
