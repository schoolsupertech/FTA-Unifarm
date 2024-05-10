import React from "react";
import "expo-dev-client";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

import AppNav from "./navigators/AppNav";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </>
  );
}
