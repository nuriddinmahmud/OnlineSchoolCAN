import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/store/auth.slice";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert("Выход", "Вы уверены, что хотите выйти?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Выйти",
        style: "destructive",
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const profileOptions = [
    {
      id: "notifications",
      title: "Уведомления",
      icon: "notifications-outline",
      onPress: () =>
        Alert.alert(
          "Скоро",
          "Настройки уведомлений будут доступны скоро"
        ),
    },
    {
      id: "downloads",
      title: "Загрузки",
      icon: "download-outline",
      onPress: () =>
        Alert.alert(
          "Скоро",
          "Управление загрузками будет доступно скоро"
        ),
    },
    {
      id: "privacy",
      title: "Конфиденциальность и безопасность",
      icon: "shield-outline",
      onPress: () =>
        Alert.alert("Скоро", "Настройки конфиденциальности будут доступны скоро"),
    },
    {
      id: "help",
      title: "Помощь и поддержка",
      icon: "help-circle-outline",
      onPress: () =>
        Alert.alert("Скоро", "Центр поддержки будет доступен скоро"),
    },
    {
      id: "about",
      title: "О приложении",
      icon: "information-circle-outline",
      onPress: () => Alert.alert("О приложении", "Online School Mobile App v1.0.0"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="book" size={24} color="#007AFF" />
          <Text style={styles.statLabel}>Курсы</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time" size={24} color="#28a745" />
          <Text style={styles.statLabel}>Часы</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="trophy" size={24} color="#ffc107" />
          <Text style={styles.statLabel}>Сертификаты</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {profileOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}>
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon as any} size={24} color="#333" />
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#dc3545" />
          <Text style={styles.logoutText}>Выход из системы</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    marginBottom: 16,
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
  },
  logoutContainer: {
    margin: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: "#dc3545",
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#999",
  },
});

export default ProfileScreen;
