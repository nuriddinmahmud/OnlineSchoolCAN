import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCourses } from "../features/courses/service/useCourses";

interface CourseListScreenProps {
  navigation: any;
}

const CourseListScreen: React.FC<CourseListScreenProps> = ({ navigation }) => {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const { getCourses } = useCourses();
  const { data } = getCourses;

  console.log(data?.courses);

  const renderCourseItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.courseItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseCategory}>{item.category}</Text>
        <Text style={styles.courseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.courseMetrics}>
          <Text style={styles.courseMetric}>
            <Ionicons name="time-outline" size={12} color="#666" />{" "}
            {item.duration}
          </Text>
          <Text style={styles.courseMetric}>
            <Ionicons name="book-outline" size={12} color="#666" />{" "}
            {item.lessonsCount} lessons
          </Text>
          <Text style={styles.courseLevel}>{item.level}</Text>
        </View>
        {item.isEnrolled && <Text style={styles.enrolledBadge}>Enrolled</Text>}
      </View>
    </TouchableOpacity>
  );

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
