import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../features/courses/service/useCourses";

interface CourseListScreenProps {
  navigation: any;
}

const CourseListScreen: React.FC<CourseListScreenProps> = ({ navigation }) => {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const { getCourses } = useCourses();
  const { data } = getCourses;

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
            placeholder="Поиск курсов..."
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
            <Text style={[styles.categoryText]}>Все</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data?.courses}
        keyExtractor={(item, idx) => item.title + idx}
        renderItem={({ item }) => (
          <CourseCard
            imageUrl={
              item?.image_url
                ? item?.image_url
                : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400"
            }
            isFree={item.is_free}
            title={item.title}
            level={item.level}
            description={item.description}
            instructor={item.instructor}
            duration={item.duration}
            rating={item.rating}
            studentsCount={item.students_count}
            category={item.category}
            onPress={() =>
              navigation.navigate("CourseDetail", { courseId: item.id })
            }
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
    borderRadius: 20,
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
});

export default CourseListScreen;
