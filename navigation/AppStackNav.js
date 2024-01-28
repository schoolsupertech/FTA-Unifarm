import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

function AppStackNav() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: "Chi tiết sản phẩm",
          }}
        />
        <Stack.Screen
          name="CategoryDetail"
          component={CategoryDetailScreen}
          options={{
            title: "Rau, củ, quả",
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default AppStackNav;
