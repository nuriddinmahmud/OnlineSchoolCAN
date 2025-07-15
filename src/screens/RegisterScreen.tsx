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

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { register } = useAuth();
  const { isPending, mutateAsync } = register;

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен быть не менее 6 символов");
      return;
    }

    try {
      await mutateAsync(
        {
          email: email,
          password: password,
          name: name,
        },
        {
          onSuccess: () => {
            Alert.alert("Регистрация успешна", "Вы можете войти в систему");
          },
          onError: () => {
            Alert.alert(
              "Регистрация не удалась",
              "Пожалуйста, попробуйте еще раз"
            );
          },
        }
      );
    } catch (error) {
      Alert.alert("Регистрация не удалась", "Пользователь уже зарегистрирован");
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Регистрация</Text>
        <Text style={styles.subtitle}>
          Создайте аккаунт для доступа к курсам
        </Text>

        <Text style={styles.label}>Имя</Text>
        <TextInput
          style={[styles.input, nameFocused && styles.inputFocused]}
          placeholder="Ваше имя"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailFocused && styles.inputFocused]}
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Минимум 6 символов"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={isPending}>
          <Text style={styles.registerButtonText}>
            {isPending ? "Загрузка..." : "Зарегистрироваться"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
          <Text style={styles.registerButtonMainText}>
            <Text style={styles.registerButtonTextTwo}>Уже есть аккаунт?</Text>{" "}
            <Text style={styles.registerButtonTextThree}>Войти</Text>
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
    display: "flex",
    flexDirection: "column",
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
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#000",
    borderWidth: 2,
  },
  registerButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButtonTextThree: {
    fontWeight: "500",
    color: "#3b82f6",
  },
  loginButton: {
    alignItems: "center",
  },
  registerButtonMainText: {
    color: "#007AFF",
    fontSize: 16,
  },
  registerButtonTextTwo: {
    color: "#4b5563",
    fontSize: 14,
  },
});

export default RegisterScreen;
