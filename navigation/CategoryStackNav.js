import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import ProductsOverviewScreen from "../screens/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { DefaultTheme } from "../themes/DefaultTheme";

const Stack = createNativeStackNavigator();

function CategoryStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="CategoriesStack"
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
        name="CategoriesStack"
        component={CategoriesScreen}
        options={{
          headerLeft: () => null,
          title: "Danh mục",
        }}
      />
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default CategoryStackNav;
