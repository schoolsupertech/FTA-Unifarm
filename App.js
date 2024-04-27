import React from "react";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import OrderScreen from "./screens/Order";
import TransferScreen from "./screens/Transfer";
import ProfileScreen from "./screens/Profile";
import DetailTransfer from "./screens/DetailTransfer";
import DetailOrder from "./screens/DetailOrder";
import { Colors } from "./constants/colors";

const TabRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryBlue500,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={25}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Vận chuyển"
        component={TransferScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <Ionicons name="file-tray" color={color} size={30} />
            ) : (
              <Ionicons name="file-tray-outline" color={color} size={28} />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Đơn hàng"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={focused ? "document-text" : "document-text-outline"}
                color={color}
                size={25}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <Ionicons name="person" color={color} size={30} />
            ) : (
              <Ionicons name="person-outline" color={color} size={28} />
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={TabRoute} />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="DetailTransfer" component={DetailTransfer} />
          <Stack.Screen name="DetailOrder" component={DetailOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
