import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation//AppNav";

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
