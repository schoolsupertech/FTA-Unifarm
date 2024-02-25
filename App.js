import React from "react";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigators/AppNav";

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
