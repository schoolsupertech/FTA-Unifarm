import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { Color } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function CategoryStackNav() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("CategoryDetail", (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the first screen of the stack
      navigation.navigate("CategoriesStack");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: Color.primaryGreen50 },
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
          headerLeft: null,
          title: "Danh mục",
        }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
}

export default CategoryStackNav;
