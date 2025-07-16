import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const placeholderCourse = {
  title: "HTML",
  description:
    "Этот курс по HTML предназначен для тех, кто хочет научиться создавать веб-страницы с нуля. Вы изучите структуру HTML-документа, основные теги, работу с текстом, изображениями, ссылками и таблицами. Курс отлично подойдёт для начинающих веб-разработчиков.",
  badges: ["Программирование", "Начинающий", "Бесплатно"],
  instructor: "Мурадов Азиз",
  duration: "24 минут",
  rating: 0,
  reviews: 0,
  lessons: [
    {
      title: "1. HTML - создание ссылок",
      description:
        "В этом уроке курса вы узнаете, как создавать ссылки на веб-страницах с помощью тега <a>. Мы разберём внутренние и внешние ссылки, атрибуты href, target, download, а также научимся делать ссылки на e-mail и якоря внутри страницы.",
      duration: "10:29",
    },
    {
      title: "2. HTML - Работа со списками",
      description:
        "В этом уроке подробно рассматривается работа со списками. Будет объяснено, как создавать упорядоченные, неупорядоченные и списки определений, а также как их стилизовать и использовать для структурирования контента.",
      duration: "5:41",
    },
    {
      title: "3. HTML - Работа с изображениями",
      description:
        "В этом уроке подробно рассматривается работа с изображениями. Будет объяснено, как вставлять изображения на веб-страницы, настраивать их размеры, альтернативный текст и другие атрибуты, а также использовать различные форматы изображений для оптимизации загрузки страниц.",
      duration: "7:37",
    },
  ],
};

const CourseDetailScreen = () => {
  const course = placeholderCourse;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.badgesRow}>
        {course.badges.map((badge, idx) => (
          <View
            key={badge}
            style={[
              styles.badge,
              badge === "Бесплатно" && styles.badgeFree,
              badge === "Начинающий" && styles.badgeLevel,
              badge === "Программирование" && styles.badgeCategory,
            ]}>
            <Text
              style={[
                styles.badgeText,
                badge === "Бесплатно" && styles.badgeTextFree,
                badge === "Начинающий" && styles.badgeTextLevel,
                badge === "Программирование" && styles.badgeTextCategory,
              ]}>
              {badge}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <View style={styles.metaRow}>
        <Ionicons name="person-outline" size={16} color="#666" />
        <Text style={styles.metaText}>{course.instructor}</Text>
        <Ionicons name="time-outline" size={16} color="#666" style={{ marginLeft: 8 }} />
        <Text style={styles.metaText}>{course.duration}</Text>
        <Ionicons name="star" size={16} color="#FFC107" style={{ marginLeft: 8 }} />
        <Text style={styles.metaText}>{course.rating} (0 отзывов)</Text>
      </View>
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>Записаться на курс</Text>
      </TouchableOpacity>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Содержание курса</Text>
        {course.lessons.map((lesson, idx) => (
          <View key={lesson.title} style={styles.lessonCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="videocam-outline" size={18} color="#007AFF" style={{ marginRight: 8 }} />
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDuration}>{lesson.duration}</Text>
            </View>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Информация о курсе</Text>
        <Text style={styles.infoRow}><Text style={styles.infoLabel}>Уровень: </Text>Начинающий</Text>
        <Text style={styles.infoRow}><Text style={styles.infoLabel}>Длительность: </Text>{course.duration}</Text>
        <Text style={styles.infoRow}><Text style={styles.infoLabel}>Количество уроков: </Text>{course.lessons.length} уроков</Text>
        <Text style={styles.infoRow}><Text style={styles.infoLabel}>Преподаватель: </Text>{course.instructor}</Text>
      </View>
    </ScrollView>
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
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  badgeFree: {
    backgroundColor: "#28a745",
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
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
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  lessonCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
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
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#222",
  },
});

export default CourseDetailScreen; 