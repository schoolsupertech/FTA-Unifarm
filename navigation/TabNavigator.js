import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/routers";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Color } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import AppStackNav from "./AppStackNav";
import { Badge } from "react-native-paper";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getTabBarVisibility = (route) => {
  console.log("Route: " + route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Default";
  console.log("Name of route: " + routeName);

  if (routeName === "ProductDetail") {
    return "none";
  }

  return "flex";
};

const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
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
        component={AppStackNav}
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
        name="Category"
        component={CategoryStack}
        options={{
          title: "Danh mục",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-buffer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BusinessDay"
        component={AppStackNav}
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
        component={AppStackNav}
        options={{
          title: "Giỏ hàng",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AppStackNav}
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
