import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Color } from "./constants/colors";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import LogoTitle from "./themes/LogoTitle";

const BottomTabs = createBottomTabNavigator();

export default function App() {
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={{
            headerTitle: () => <LogoTitle />,
            headerRight: ({ color, size }) => (
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="cart-outline"
                  color={color}
                  size={size}
                  style={{ marginHorizontal: 20 }}
                />
                <Ionicons name="notifications" color={color} size={size} />
              </View>
            ),
            // headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarActiveTintColor: Color.brandingSuccessDark,
          }}
        >
          <BottomTabs.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              // headerTitleStyle: { flex: 1, textAlign: "left" },
              // headerLeft: () => <LogoTitle />,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          ></BottomTabs.Screen>
          <BottomTabs.Screen
            name="CategoriesScreen"
            component={CategoriesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}
          ></BottomTabs.Screen>
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
