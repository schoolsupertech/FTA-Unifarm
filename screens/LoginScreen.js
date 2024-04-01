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
import LogoTitle from "../themes/LogoTitle";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, onBtnGoogleLoginHandler } = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ flex:1, paddingHorizontal: 25, justifyContent: 'center' }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <Image
            source={require("../assets/toppng.com-vegetables-images-png-vegetables-1911x1320.png")}
            resizeMode="contain"
            style={{ height: 150, width: "100%" }}
          />
          <View style={{height: 50, width: 500, marginVertical: 15 ,justifyContent: 'center', alignItems: 'center'}}>
          <LogoTitle />
          </View>

        </View>
        {/* <Text
            style={{
              marginBottom: 30,
              // fontFamily: 'Roboto-Medium',
              fontSize: 25,
              fontWeight: "bold",
              color: Colors.primaryGreen700,
              textAlign: "center",
            }}
          >
            Đăng nhập
          </Text> */}
        <InputField
          label={"Email ID"}
          icon={
            <Ionicons
              name="at"
              size={30}
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
          label={"Mật khẩu"}
          icon={
            <Ionicons
              name="key-outline"
              size={30}
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
            styleButton={{width: "100%"}}
          >
            Đăng nhập
          </MainButton>
        </View>

        <View style={{marginTop: 30}}>
        <Text
          style={{ textAlign: "center", color: "#666", marginVertical: 20 }}
        >
          Hoặc, đăng nhập với ...
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            // onPress={() => {
            //   onBtnGoogleLoginHandler().then(() =>
            //     console.log("Signed in with Google!"),
            //   );
            // }}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 50,
              padding: 10,
              marginHorizontal: 10
            }}
          >
            <GoogleSVG height={35} width={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 50,
              padding: 10,
              marginHorizontal: 10

            }}
          >
            <FacebookSVG height={35} width={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 50,
              padding: 10,
              marginHorizontal: 10

            }}
          >
            <TwitterSVG height={35} width={35} />
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
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonView: {
    ...DefaultTheme.btnView,
    width: "100%",
    borderRadius: 20,
  },
});
