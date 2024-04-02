import React, { useContext } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppStackNav from "./AppStackNav";
import { AuthContext } from "../context/AuthContext";
import { store, persistor } from "../context/redux/storage/store";

function AppNav() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppStackNav />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default AppNav;
