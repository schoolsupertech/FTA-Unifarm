import React from "react";
import { StatusBar } from "expo-status-bar";

import AppNav from "./navigators/AppNav";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </>
  );
}
