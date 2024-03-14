import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            // fontFamily: "Inter-Bold",
            fontWeight: "bold",
            fontSize: 30,
            color: Colors.primaryGreen600,
          }}
        >
          FARM TO APARTMENT
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          width={400}
          height={500}
          source={{
            uri: "https://media.istockphoto.com/id/1463452333/vi/anh/n%C3%B4ng-nghi%E1%BB%87p-th%C3%B4ng-minh-gi%E1%BB%AF-c%C3%A2y-non-n%C3%B4ng-nghi%E1%BB%87p-th%C3%B4ng-minh-v%C3%A0-n%C3%B4ng-nghi%E1%BB%87p-ch%C3%ADnh-x%C3%A1c-4-0-kh%C3%A1i.jpg?s=1024x1024&w=is&k=20&c=2CJ0CR5ALonSNe8fZCfzmUbWLZEiUlYCGX6w5xsHgz4=",
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primaryGreen800,
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            // fontFamily: "Roboto-MediumItalic",
          }}
        >
          Let's Begin
        </Text>
        <Ionicons name="arrow-forward-sharp" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
