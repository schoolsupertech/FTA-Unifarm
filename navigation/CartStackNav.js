import React from "react";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Color } from "../constants/colors";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

function CartStackNav() {
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
        name="CartStack"
        component={CartScreen}
        options={{
          headerLeft: null,
          title: "Giỏ hàng",
        }}
      />
      {/*
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
      */}
    </Stack.Navigator>
  );
}

export default CartStackNav;
