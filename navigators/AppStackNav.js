import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

function AppStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
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
  );
}

export default AppStackNav;
