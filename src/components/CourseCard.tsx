import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CourseCardProps {
  imageUrl: string;
  isFree: boolean;
  title: string;
  level: string;
  description: string;
  instructor: string;
  duration: string;
  rating: number;
  studentsCount: number;
  category: string;
  onPress: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  imageUrl,
  isFree,
  title,
  level,
  description,
  instructor,
  duration,
  rating,
  studentsCount,
  category,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {isFree && (
        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>Бесплатно</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="person-outline" size={14} color="#666" />
          <Text style={styles.metaText}>{instructor}</Text>
          <Ionicons
            name="time-outline"
            size={14}
            color="#666"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.metaText}>{duration}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.ratingText}>{rating} (0 студентов)</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{category}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 140,
  },
  freeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#28a745",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2,
  },
  freeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  levelBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  levelBadgeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: "auto",
  },
  categoryBadgeText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CourseCard;
