import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import createAxios from "../utils/AxiosUtility";
import { BASE_URL } from "../api/config";

const API = createAxios();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [productsInfo, setProductsInfo] = useState(null);
  const [prodItemInfo, setProdItemInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  GoogleSignin.configure({
    // webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId:
      "611874810536-ea5432vg9er0nb16i4drj14tv5rv6i8v.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  const products = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "/products")
      .then((res) => {
        let productsInfo = res.data;
        setProductsInfo(productsInfo.payload);
      })
      .catch((e) => {
        console.log("An error occurred while loading API-products: " + e);
        console.log("Message: " + e.response.status);
      });
    setIsLoading(false);
  };

  // const prodsItem = async () => {
  //   setIsLoading(true);
  //
  //   await axios
  //     .get(BASE_URL + "/categories-recommends")
  //     .then((res) => {
  //       let categoriesInfo = res.data;
  //       let categoryRecomId = categoriesInfo.payload
  //         .filter((items) => items.name.toLowerCase().includes("nổi bật"))
  //         .map((item) => item.id);
  //       categoryRecomId &&
  //         axios
  //           .get(BASE_URL + "/category/" + categoryRecomId + "/products")
  //           .then((res) => {
  //             let prodsInfo = res.data;
  //             let prodRecomId = prodsInfo.payload.map((item) => item.id);
  //             prodRecomId &&
  //               axios
  //                 .get(BASE_URL + "/product/" + prodRecomId + "/product-items")
  //                 .then((res) => {
  //                   let prodsItemInfo = res.data;
  //                   setProdsItemInfo(prodsItemInfo.payload);
  //                 })
  //                 .catch((e) => {
  //                   console.log(
  //                     "An error occurred while loading API-prodsItem: " + e,
  //                   );
  //                   console.log("Message: " + e.response.status);
  //                 });
  //           })
  //           .catch((e) => {
  //             console.log("An error occurred while loading API-prods: " + e);
  //             console.log("Message: " + e.response.status);
  //           });
  //     })
  //     .catch((e) => {
  //       console.log(
  //         `An error occurred while loading API-categories_recommends: ${e}`,
  //       );
  //       console.log(`Message: ${e.response.status}`);
  //     });
  //
  //   setIsLoading(false);
  // };

  // const prodItemDetail = async (prodItemId) => {
  //   setIsLoading(true);
  //
  //   await axios
  //     .get(BASE_URL + "/product-item" + prodItemId)
  //     .then((res) => {
  //       let prodItemDetailInfo = res.data;
  //       setProdItemInfo(prodItemDetailInfo.payload);
  //       console.log(
  //         "prodItemDetailInfo: " + JSON.stringify(prodItemDetailInfo.payload),
  //       );
  //     })
  //     .catch((e) => {
  //       console.log("An error occurred while loading API-prodItemDetail: " + e);
  //       console.log("Message: " + e.response.status);
  //     });
  //
  //   setIsLoading(false);
  // };

  const register = async (user) => {
    setIsLoading(true);
    const response = await API.post("/auth/register", user);
    response &&
      Alert.alert(
        "Đăng ký thành công",
        "Chúc mừng quý khách vừa tạo tài khoản thành công, quý khách đã có thể đăng nhập vào hệ thống",
        [{ text: "OK" }],
      );
    setIsLoading(false);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await API.post("/auth/login", {
      email: email,
      password: password,
    });

    if (response) {
      let decodedToken = jwtDecode(response.token);
      setUserToken(response);
      setUserInfo(decodedToken);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({ userInfo: response.token, loggedIn: "systemLog" }),
      );
    }
    setIsLoading(false);
  };

  const onBtnGoogleLoginHandler = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      console.log(JSON.stringify(userInfo, null, 2));
      setUserInfo(userInfo.user);
      setUserToken(userInfo.idToken);
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({ userInfo, loggedIn: "google" }),
      );
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.user));
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
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userData");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const userStorage = await AsyncStorage.getItem("userData");

      if (userStorage !== null) {
        const data = JSON.parse(userStorage);
        const userInfo = await AsyncStorage.getItem("userInfo");
        const userInfoJsonParse = JSON.parse(userInfo);

        if (data.loggedIn === "google") {
          setUserToken(data.userInfo.idToken);
          setUserInfo(userInfoJsonParse);
        } else if (data.loggedIn === "systemLog") {
          setUserToken(data.userInfo);
          setUserInfo(userInfoJsonParse);
        }
      }
    } catch (e) {
      console.log(`Error occurred at: isLoggedIn error: ${e}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
    products();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        onBtnGoogleLoginHandler,
        register,
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        productsInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
