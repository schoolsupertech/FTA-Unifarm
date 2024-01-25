import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/routers";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Color } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const getTabBarVisibility = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
//   console.log(routeName);
//
//   if (routeName === "ProductDetail") {
//     return "none";
//   }
//
//   return "flex";
// };

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
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
        name="HomeTab"
        component={HomeScreen}
        options={({ route }) => ({
          title: "Home",
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
          title: "Category",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
