import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "react-native-paper";
import { View } from "react-native";

import HomeStackNav from "./HomeStackNav";
import CategoryStackNav from "./CategoryStackNav";
import CartStackNav from "./CartStackNav";
import { Color } from "../constants/colors";

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  // console.log("Name of route: " + routeName);

  if (routeName === "ProductDetail" || routeName === "ProductsOverview") {
    return "none";
  }

  return "flex";
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.primaryGreen700,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNav}
        options={({ route }) => ({
          title: "Trang chủ",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStackNav}
        options={({ route }) => ({
          title: "Danh mục",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-buffer" color={color} size={size} />
          ),
        })}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     navigation.navigate("Categories");
        //   },
        // })}
      />
      <Tab.Screen
        name="BusinessDay"
        component={HomeStackNav}
        options={{
          title: "Mặt hàng hôm nay",
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: "red" }}>
              <Ionicons name="flash" color="yellow" size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNav}
        options={{
          title: "Giỏ hàng",
          tabBarIcon: ({ color, size }) => (
            <>
              <Ionicons name="cart" color={color} size={size} />
              <Badge style={{ position: "absolute", top: -4, right: 14 }}>
                6
              </Badge>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeStackNav}
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
