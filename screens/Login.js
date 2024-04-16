import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import createAxios from "../utils/axios";
import { ButtonFlex } from "../components/Buttons";

const API = createAxios();

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusMail, setFocusMail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [noti, setNoti] = useState();

  async function handleLogin() {
    if (email === "" || password === "") {
      setNoti("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await API.post("auth/login", {
        email: email,
        password: password,
      });

      if (response.token) {
        console.log("Token: ", response.token);
        AsyncStorage.setItem(
          "UserToken",
          JSON.stringify({ userToken: response.token }),
        )
          .then(() => {
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.log(error);
          });
        setNoti();
      }
    } catch (error) {
      console.log(error);
      setNoti("Sai tên tài khoản hoặc mật khẩu!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/backgrounds/LogoWithTitle.png")}
        style={{ width: 80, height: 80, marginRight: 5 }}
      />
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>UniFarm</Text>
      </View>
      <TextInput
        style={{
          justifyContent: "center",
          padding: 20,
          height: 60,
          width: "80%",
          backgroundColor: "white",
          marginTop: 20,
          marginBottom: 0,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: focusMail === true ? "#16A80A" : "#d9d9d9",
          fontWeight: "bold",
          elevation: 3,
        }}
        placeholder="Email"
        onChangeText={(newTextPhone) => setEmail(newTextPhone)}
        onFocus={() => setFocusMail(!focusMail)}
        onBlur={() => setFocusMail(!focusMail)}
      />
      <TextInput
        style={{
          justifyContent: "center",
          padding: 20,
          height: 60,
          width: "80%",
          backgroundColor: "white",
          marginTop: 20,
          marginBottom: 0,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: focusPassword === true ? "#16A80A" : "#d9d9d9",
          fontWeight: "bold",
          elevation: 3,
        }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(newTextPassword) => setPassword(newTextPassword)}
        onFocus={() => setFocusPassword(!focusPassword)}
        onBlur={() => setFocusPassword(!focusPassword)}
      />
      <Text
        style={{
          fontWeight: 500,
          fontSize: 12,
          color: "#16A80A",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Quên mật khẩu?
      </Text>
      <ButtonFlex
        title="Đăng nhập"
        onPress={handleLogin}
        stylesButton={{
          borderRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 10,
          marginBottom: 20,
          elevation: 5,
        }}
        stylesText={{ fontSize: 16 }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 40,
          padding: 10,
          width: 250,
          backgroundColor: "#F5F5F5",
          elevation: 3,
          borderRadius: 10,
        }}
      >
        <Image
          source={require("../assets/logos/GoogleLogin.png")}
          style={{ height: 30, width: 30, borderRadius: 50, marginRight: 10 }}
        />
        <Text style={{ fontWeight: "bold" }}>Đăng nhập với Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
