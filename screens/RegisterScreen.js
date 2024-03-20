import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Ionicons } from "@expo/vector-icons";

import InputField from "../components/common/text/InputField";
import MainButton from "../components/common/button/MainButton";
import createAxios from "../utils/AxiosUtility";
import { Colors } from "../constants/colors";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    userName: "",
    role: "Customer",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState("Date of Birth");

  function inputChangeHandler(value, userField) {
    setUser({
      ...user,
      [userField]: value,
    });
  }

  useEffect(() => {
    if (confirmPassword !== null && confirmPassword.length !== 0) {
      if (user.password !== confirmPassword) {
        setIsError(true);
        console.log("Password and confirm password is not correct");
      } else {
        setIsError(false);
        console.log("Password is correct");
      }
    }
  }, [confirmPassword, user.password]);

  function onRegisterHandler() {
    if (!isError) {
      register(user);
    } else {
      console.log("Error occurred");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1527784281695-866fa715d9d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            resizeMode="cover"
            style={{ height: 300, width: "100%", borderRadius: 12 }}
          />
          <Text
            style={{
              marginTop: 8,
              marginBottom: 20,
              // fontFamily: 'Roboto-Medium',
              fontSize: 48,
              fontWeight: "bold",
              textAlign: "center",
              color: Colors.primaryGreen700,
            }}
          >
            ĐĂNG KÝ
          </Text>
        </View>

        <InputField
          label={"User name"}
          icon={
            <Ionicons
              name="person-circle-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          autoCorrect={false}
          autoCapitalize="none"
          value={user.userName}
          onChangeText={(value) => inputChangeHandler(value, "userName")}
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <InputField
            label={"Họ"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={{ width: "49%", marginRight: 12 }}
            value={user.lastName}
            onChangeText={(value) => inputChangeHandler(value, "lastName")}
          />

          <InputField
            label={"Tên"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            style={{ width: "49%" }}
            value={user.firstName}
            onChangeText={(value) => inputChangeHandler(value, "firstName")}
          />
        </View>

        <InputField
          label={"Email"}
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
          value={user.email}
          onChangeText={(value) => inputChangeHandler(value, "email")}
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
          value={user.password}
          onChangeText={(value) => inputChangeHandler(value, "password")}
        />

        <InputField
          label={"Confirm Password"}
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
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
        />

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={"date"}
          maximumDate={new Date("2005-01-01")}
          minimumDate={new Date("1980-01-01")}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <InputField
          label={"Số điện thoại"}
          icon={
            <Ionicons
              name="call-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          maxLength={10}
          keyboardType={"number-pad"}
          autoCapitalize="none"
          autoCorrect={false}
          value={user.phoneNumber}
          onChangeText={(value) => inputChangeHandler(value, "phoneNumber")}
        />

        <View style={styles.buttonView}>
          <MainButton onPress={onRegisterHandler}>Đăng ký</MainButton>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Text>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: Colors.primaryGreen800, fontWeight: "700" }}>
              {" "}
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  buttonView: {
    ...DefaultTheme.btnView,
    width: "100%",
    alignItems: "center",
  },
});
