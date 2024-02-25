import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";

import TabNavigator from "./TabNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CatListProdScreen from "../screens/CatListProdScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import { DefaultTheme } from "../themes/DefaultTheme";

const Stack = createNativeStackNavigator();

function AppStackNav() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: DefaultTheme.headerBgColor },
        headerLeft: () => (
          <IconButton
            style={{ margin: 0, padding: 0 }}
            icon={"chevron-left-circle-outline"}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="CatListProdScreen" component={CatListProdScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNav;