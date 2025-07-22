import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import CourseListScreen from "../screens/CourseListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import LessonDetailScreen from "../screens/LessonDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ title: "Курсы" }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ headerShown: true, title: "Назад к курсу" }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === "Courses") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "Progress") {
          iconName = focused ? "stats-chart" : "stats-chart-outline";
        } else if (route.name === "Bookmarks") {
          iconName = focused ? "bookmark" : "bookmark-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else {
          iconName = "book-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Главная' }} />
    <Tab.Screen name="Courses" component={CoursesStack} options={{ tabBarLabel: 'Курсы' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Профиль' }} />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
