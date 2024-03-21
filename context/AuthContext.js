import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
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
  const [authState, setAuthState] = useState({
    token: "",
    authenticated: false,
  });

  GoogleSignin.configure({
    // webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId:
      "611874810536-ea5432vg9er0nb16i4drj14tv5rv6i8v.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await API.customRequest(
        "get",
        "/aboutMe",
        authState?.token,
      );
      setUserInfo(response);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    };

    authState?.authenticated && fetchUserInfo();
  }, [authState]);

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
      setAuthState({
        token: response.token,
        authenticated: true,
      });

      AsyncStorage.setItem(
        "TOKEN_KEY",
        JSON.stringify({ token: response.token, loggedIn: "systemLog" }),
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

      setUserInfo(userInfo.user);
      setAuthState({
        token: userInfo.idToken,
        authenticated: true,
      });
      AsyncStorage.setItem(
        "TOKEN_KEY",
        JSON.stringify({ token: userInfo.idToken, loggedIn: "google" }),
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
    setAuthState(null);
    setUserInfo(null);
    AsyncStorage.removeItem("TOKEN_KEY");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const tokenStorage = await AsyncStorage.getItem("TOKEN_KEY");

      console.log("Token storage: " + JSON.stringify(tokenStorage, null, 2));

      if (tokenStorage !== null) {
        const data = JSON.parse(tokenStorage);
        const userInfo = await AsyncStorage.getItem("userInfo");
        const userInfoJsonParse = JSON.parse(userInfo);

        setAuthState({
          token: data.token,
          authenticated: true,
        });
        setUserInfo(userInfoJsonParse);
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

  const value = {
    onBtnGoogleLoginHandler,
    register,
    login,
    logout,
    isLoading,
    authState,
    userInfo,
    productsInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
