import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import CourseListScreen from "../screens/CourseListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ title: "Courses" }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ title: "Курс" }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
