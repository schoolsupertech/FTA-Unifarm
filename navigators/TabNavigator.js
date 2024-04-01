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
import WalletScreen from "../screens/WalletScreen";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";
import TodayScreen from "../screens/TodayScreen";

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
  const { authState } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryGreen700,
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90
        }
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
          tabBarIcon: ({focused, color, size }) => (
            <Ionicons name={focused ? "home":"home-outline"} color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoriesScreen}
        options={{
          title: "Danh mục",
          tabBarIcon: ({focused, color, size }) => (
            <Ionicons name={focused ? "layers":"layers-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodayScreen"
        component={TodayScreen}
        options={{
          title: "Hôm nay",
          tabBarIcon: ({ color, size }) => (
            <View style={{ backgroundColor: Colors.primaryGreen700, borderRadius: 50, padding: 20, marginTop: -40,
                 shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
            }}>
              <Ionicons name="flash" color="#fff" size={size} />
            </View>
          ),
        }}
      />
      {authState?.authenticated && (
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            title: "Ví",
            tabBarIcon: ({focused, color, size }) => (
              <>
                <Ionicons name={focused ? "wallet":"wallet-outline"} color={color} size={size} />
                {/* <Badge style={{ position: "absolute", top: 0, right: 20, backgroundColor: '#FF2929' }}>
                  6
                </Badge> */}
              </>
            ),
            // headerShown: true,
            // headerTitle: "Số dư ví",
            // headerRight: () => (
            //   <Ionicons
            //     style={{ marginRight: 20, padding: 0 }}
            //     name={"wallet-outline"}
            //     size={24}

            //   />
            // )
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Cá nhân",
          tabBarIcon: ({focused, color, size }) => (
            <Ionicons name={focused ? "person":"person-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
