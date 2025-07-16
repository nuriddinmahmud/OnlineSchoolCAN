import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCourses } from "../features/courses/service/useCourses";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { getCourses } = useCourses();
  const { data } = getCourses;

  const stats = [
    {
      icon: (
        <LinearGradient
          colors={["#3ec6f2", "#7c4dff"]}
          style={styles.iconCircle}>
          <Ionicons name="book-outline" size={28} color="#fff" />
        </LinearGradient>
      ),
      value: "50+",
      label: "Курсов",
    },
    {
      icon: (
        <LinearGradient
          colors={["#1dd1a1", "#1d62e2"]}
          style={styles.iconCircle}>
          <Ionicons name="people-outline" size={28} color="#fff" />
        </LinearGradient>
      ),
      value: "1000+",
      label: "Студентов",
    },
    {
      icon: (
        <LinearGradient
          colors={["#ff6fb1", "#ff9472"]}
          style={styles.iconCircle}>
          <Ionicons name="ribbon-outline" size={28} color="#fff" />
        </LinearGradient>
      ),
      value: "95%",
      label: "Завершили курсы",
    },
  ];

  const renderCourse = ({ item }: { item: any }) => (
    <View
      style={{ padding: 10, alignItems: "center", backgroundColor: "#f9fafb" }}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.image_url }} style={styles.image} />
          {item?.is_free && (
            <View style={styles.freeBadge}>
              <Text style={styles.freeBadgeText}>Бесплатно</Text>
            </View>
          )}
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{item.level}</Text>
            </View>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.metaRow}>
            <Ionicons name="person-outline" size={16} color="#888" />
            <Text style={styles.metaText}>{item.instructor}</Text>
            <Ionicons
              name="time-outline"
              size={16}
              color="#888"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={16} color="#ffc107" />
            <Text style={styles.metaText}>0 (0 студентов)</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{item.category}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{
        alignItems: "center",
      }}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>
          <Text style={styles.logoEdu}> Education</Text>
        </Text>
      </View>

      <View style={styles.badge}>
        <Ionicons
          name="book-outline"
          size={18}
          color="#1d62e2"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.badgeText}>Качественное онлайн-образование</Text>
      </View>

      <Text style={styles.mainTitle}>Изучайте новые{"\n"}навыки</Text>
      <Text style={styles.mainTitleBlue}>онлайн</Text>

      <Text style={styles.subtitle}>
        Получите доступ к качественному образованию от лучших преподавателей.
        Учитесь в удобном темпе и достигайте своих целей.
      </Text>

      <View style={{ width: "100%", padding: 20 }}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            navigation.navigate("Login");
          }}>
          <LinearGradient
            colors={["#3ec6f2", "#7c4dff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}>
            <Text style={styles.primaryButtonText}>Начать обучение</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Courses")}>
        <Text style={styles.secondaryButtonText}>Посмотреть курсы</Text>
      </TouchableOpacity>

      <View style={styles.statsSection}>
        {stats?.map((stat, idx) => (
          <View style={styles.statCard} key={idx}>
            {stat.icon}
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.coursesContainer}>
        <Text style={styles.sectionTitle}>Доступные курсы</Text>
        <FlatList
          data={data?.courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#eef3ff",
    width: "100%",
  },
  logoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 90,
    textAlign: "center",
    paddingTop: 25,
    paddingLeft: 25,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: {
    width: 100,
    height: 50,
    marginRight: 6,
  },
  logoText: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logoEdu: {
    color: "#6fd6e8",
    fontSize: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 22,
    marginTop: 50,
  },
  badgeText: {
    color: "#1d62e2",
    fontSize: 15,
    fontWeight: "500",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 0,
    lineHeight: 38,
  },
  mainTitleBlue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7c4dff",
    textAlign: "center",
    marginBottom: 16,
    marginTop: -2,
  },
  subtitle: {
    fontSize: 20,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 20,
    lineHeight: 32,
    width: "95%",
    alignSelf: "center",
  },
  primaryButton: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 14,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: "#444151",
    fontSize: 18,
    fontWeight: "500",
  },
  statsSection: {
    width: "100%",
    marginTop: 60,
    alignItems: "center",
    backgroundColor: "#eef2ff",
  },
  statCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 28,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  coursesContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
    marginLeft: 20,
  },
  listContent: {
    paddingBottom: 24,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 22,
    width: "98%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 140,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  freeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#22c55e",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  freeBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  levelBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  levelBadgeText: {
    color: "#222",
    fontSize: 13,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  categoryBadgeText: {
    color: "#222",
    fontSize: 13,
    fontWeight: "500",
  },
  detailsButton: {
    backgroundColor: "#181f2a",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
