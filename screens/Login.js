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
import { DefaultTheme } from "../themes/DefaultTheme";

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
        style={{ width: 150, height: 150, marginRight: 5 }}
      />
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "dodgerblue",
          }}
        >
          FTA-Station
        </Text>
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
          color: "blue",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Quên mật khẩu?
      </Text>
      <ButtonFlex
        title="Đăng nhập"
        onPress={handleLogin}
        stylesButton={DefaultTheme.btnFlex}
        stylesText={{ fontSize: 16 }}
      />
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
