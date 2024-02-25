import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";

import CategoriesScreen from "../screens/CategoriesScreen";
import CatListProdScreen from "../screens/CatListProdScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

function CategoryStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="CategoriesStack"
      screenOptions={({ navigation }) => ({
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
          title: "Tất cả danh mục",
        }}
      />
      <Stack.Screen name="CatListProdScreen" component={CatListProdScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default CategoryStackNav;
