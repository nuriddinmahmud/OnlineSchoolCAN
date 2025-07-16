import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CourseCard from "../components/CourseCard";

interface CourseListScreenProps {
  navigation: any;
}

const placeholderCourses = [
  {
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    isFree: true,
    title: "HTML",
    level: "Начинающий",
    description: "Этот курс по HTML предназначен для тех, кто хочет научиться создавать веб-страницы с...",
    instructor: "Мурадов Азиз",
    duration: "24 минут",
    rating: 0,
    studentsCount: 0,
    category: "Программирование",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    isFree: true,
    title: "C++",
    level: "Начинающий",
    description: "Этот курс предназначен для начинающих и познакомит вас с основами языка...",
    instructor: "Мурадов Азиз",
    duration: "20 минут",
    rating: 0,
    studentsCount: 0,
    category: "Программирование",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    isFree: true,
    title: "Python",
    level: "Начинающий",
    description: "Этот курс по Python предназначен для новичков и поможет вам освоить основы...",
    instructor: "Мурадов Азиз",
    duration: "25 минут",
    rating: 0,
    studentsCount: 0,
    category: "Программирование",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    isFree: true,
    title: "Сбор средств на постройку школы",
    level: "Начинающий",
    description: "Научить участников разрабатывать и проводить эффективные кампании по сбору...",
    instructor: "Саид",
    duration: "1 час",
    rating: 0,
    studentsCount: 0,
    category: "Бизнес",
  },
];

const CourseListScreen: React.FC<CourseListScreenProps> = ({ navigation }) => {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCategoryFilter(!showCategoryFilter)}>
          <Ionicons name="filter" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showCategoryFilter && (
        <View style={styles.categoryFilter}>
          <TouchableOpacity style={[styles.categoryItem]}>
            <Text style={[styles.categoryText]}>All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={placeholderCourses}
        keyExtractor={(item, idx) => item.title + idx}
        renderItem={({ item }) => (
          <CourseCard
            imageUrl={item.imageUrl}
            isFree={item.isFree}
            title={item.title}
            level={item.level}
            description={item.description}
            instructor={item.instructor}
            duration={item.duration}
            rating={item.rating}
            studentsCount={item.studentsCount}
            category={item.category}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  categoryFilter: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  categoryItemSelected: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseList: {
    padding: 16,
  },
  courseItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  courseMetrics: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  courseMetric: {
    fontSize: 12,
    color: "#666",
    marginRight: 16,
  },
  courseLevel: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  enrolledBadge: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "600",
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

export default CourseListScreen;
