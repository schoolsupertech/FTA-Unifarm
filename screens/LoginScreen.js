import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
import TwitterSVG from "../assets/images/misc/twitter.svg";
import InputField from "../components/common/text/InputField";
import MainButton from "../components/common/button/MainButton";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, onBtnGoogleLoginHandler } = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/toppng.com-vegetables-images-png-vegetables-1911x1320.png")}
            resizeMode="cover"
            style={{ height: 300, width: "100%" }}
          />
          <Text
            style={{
              marginTop: 8,
              // fontFamily: 'Roboto-Medium',
              fontSize: 48,
              fontWeight: "bold",
              color: Colors.primaryGreen700,
              textAlign: "center",
            }}
          >
            ĐĂNG NHẬP
          </Text>
        </View>

        <InputField
          label={"Email ID"}
          icon={
            <Ionicons
              name="at"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="key-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <View style={styles.buttonView}>
          <MainButton
            onPress={() => {
              login(email, password).then(() =>
                console.log("Signed in with systemLog"),
              );
            }}
          >
            Đăng nhập
          </MainButton>
        </View>

        <Text
          style={{ textAlign: "center", color: "#666", marginVertical: 20 }}
        >
          Hoặc, đăng nhập với ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            // onPress={() => {
            //   onBtnGoogleLoginHandler().then(() =>
            //     console.log("Signed in with Google!"),
            //   );
            // }}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Bạn là khách hàng mới?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: Colors.primaryGreen800, fontWeight: "700" }}>
              {" "}
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonView: {
    ...DefaultTheme.btnView,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
  },
});
