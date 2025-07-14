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

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await register.mutateAsync({
        email: email,
        password: password,
        name: name,
      });
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again");
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
          style={styles.input}
          placeholder="Ваше имя"
          value={name}
          onChangeText={setName}
        />

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
          placeholder="Минимум 6 символов"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
          <Text style={styles.loginButtonText}>
            <Text style={styles.loginButtonTextTwo}>Уже есть аккаунт?</Text>{" "}
            Войти
          </Text>
        </TouchableOpacity>
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
    fontWeight: "400",
    color: "#64748b",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
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
  loginButton: {
    alignItems: "center",
  },
  loginButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  loginButtonTextTwo: {
    color: "#020817",
    fontSize: 16,
  },
});

export default RegisterScreen;
