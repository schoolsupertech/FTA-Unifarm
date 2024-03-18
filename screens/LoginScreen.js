import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../components/common/button/MainButton";
import InputField from "../components/common/text/InputField";
import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
import TwitterSVG from "../assets/images/misc/twitter.svg";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const { loginWithGoogle } = useContext(AuthContext);

  GoogleSignin.configure({
    // webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId:
      "611874810536-ea5432vg9er0nb16i4drj14tv5rv6i8v.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  async function onBtnGoogleLoginHandler() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      AsyncStorage.setItem(
        "googleUserData",
        JSON.stringify({ userInfo, loggedIn: true }),
      );
      // switch(account.role) {
      //   case "unknown":
      //     const signUp_Response = API.post("/signup", {
      //       role: "customer",
      //       address: loggedUser?.address || "",
      //       user: {
      //         photo: userInfo.user.photo,
      //         name: userInfo.user.name,
      //         phone: loggedUser?.phoneNumber || "",
      //         email: userInfo.user.email,
      //       },
      //     });
      //     await navigation.navigate("Profile");
      //     break;
      //   case "customer":
      //     break;
      // }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

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
              // fontFamily: 'Roboto-Medium',
              fontSize: 48,
              fontWeight: "bold",
              color: Colors.primaryGreen700,
              textAlign: "center",
            }}
          >
            Login
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
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />

        <MainButton
          label={"Login"}
          onPress={() => {
            login();
          }}
        />

        <Text
          style={{ textAlign: "center", color: "#666", marginVertical: 30 }}
        >
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onBtnGoogleLoginHandler().then(() =>
                console.log("Signed in with Google!"),
              );
            }}
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
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: Colors.primaryGreen800, fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
