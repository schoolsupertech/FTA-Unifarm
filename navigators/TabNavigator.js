import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  console.log(routeName);

  if (routeName === "ProductDetail") {
    return "none";
  }

  return "flex";
};

function TabNavigator() {
  const { userToken } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryGreen700,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ route }) => ({
          title: "Trang chủ",
          // tabBarStyle: {
          //   display: getTabBarVisibility(route),
          // },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoriesScreen}
        options={{
          title: "Danh mục",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BusinessDay"
        component={HomeScreen}
        options={{
          title: "Mặt hàng hôm nay",
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: "red" }}>
              <Ionicons name="flash" color="yellow" size={size} />
            </View>
          ),
        }}
      />
      {userToken && (
        <Tab.Screen
          name="Cart"
          component={CartScreen}
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
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
