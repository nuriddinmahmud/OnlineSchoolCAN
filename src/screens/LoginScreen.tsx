import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../features/auth/service/useAuth";
import Feather from "@expo/vector-icons/Feather";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { isPending, mutateAsync } = login;

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    try {
      mutateAsync(
        { email, password },
        {
          onSuccess: () => {
            Alert.alert("Вход успешен", "Вы можете продолжить обучение");
            navigation.navigate("MainTabs");
          },
          onError: () => {
            Alert.alert("Ошибка входа", "Неверные учетные данные для входа");
          },
        }
      );
    } catch (error) {
      Alert.alert("Ошибка входа", "Неверные учетные данные для входа");
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Вход в систему</Text>
        <Text style={styles.subtitle}>
          Войдите в свой аккаунт для продолжения обучения
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          placeholder="Ваш пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButtonMain}
          onPress={handleLogin}
          disabled={isPending}>
          <Text style={styles.loginButtonTextMain}>
            {isPending ? "Загрузка..." : "Войти"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={navigateToRegister}>
          <Text style={styles.registerButtonText}>
            <Text style={styles.registerButtonTextTwo}>Нет аккаунта?</Text>{" "}
            <Text style={styles.registerButtonTextFour}>
              Зарегистрироваться
            </Text>
          </Text>
          <Text style={styles.registerButtonTextThree}>
            После регистрации проверьте email для подтверждения аккаунта
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainTitleContainer}>
        <Text style={styles.mainTitle}>
          <Feather name="book" size={30} color="#2563eb" />
          Can Education
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#020817",
    marginBottom: 5,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainTitleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 60,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButtonMain: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonTextMain: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButton: {
    alignItems: "center",
  },
  registerButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  registerButtonTextTwo: {
    color: "#4b5563",
    fontSize: 14,
  },
  registerButtonTextThree: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 10,
  },
  registerButtonTextFour: {
    color: "#3b82f6",
    fontWeight: "500",
  },
});

export default LoginScreen;
