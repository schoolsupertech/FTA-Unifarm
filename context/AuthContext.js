import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    // setIsLoading(true);
    // axios
    //   .post(`${BASE_OAUTH_URL}`, {
    //     username,
    //     password,
    //   })
    //   .then((res) => {
    //     let userInfo = res.data;
    //     setUserInfo(userInfo);
    //     setUserToken(userInfo.data.token);
    //
    //     AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     AsyncStorage.setItem("userToken", userInfo.data.token);
    //
    //     console.log("User Info: " + userInfo);
    //     console.log("User Token: " + userInfo.data.token);
    //   })
    //   .catch((e) => {
    //     console.log(`Error at AuthContext - ${e}`);
    //     console.log(`Message: ${e.response.data.message}`);
    //   });
    setUserToken("asdjgfowei");
    setIsLoading(false);
  };

  const logout = () => {
    // setIsLoading(true);
    setUserToken(null);
    // AsyncStorage.removeItem("userInfo");
    // AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  // const isLoggedIn = async () => {
  //   try {
  //     setIsLoading(true);
  //     let userInfo = await AsyncStorage.getItem("userInfo");
  //     let userToken = await AsyncStorage.getItem("userToken");
  //
  //     userInfo = JSON.parse(userInfo);
  //
  //     if (userInfo) {
  //       setUserInfo(userInfo);
  //       setUserToken(userToken);
  //     }
  //     setIsLoading(false);
  //   } catch (e) {
  //     console.log(`Error occurred at: isLoggedIn error: ${e}`);
  //   }
  // };

  // useEffect(() => {
  //   isLoggedIn();
  // }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
