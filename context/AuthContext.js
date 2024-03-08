import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../api/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [categoriesRecommendsInfo, setCategoriesRecommendsInfo] =
    useState(null);
  const [categoriesInfo, setCategoriesInfo] = useState(null);
  const [productsInfo, setProductsInfo] = useState(null);
  const [prodsItemInfo, setProdsItemInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const categories = async () => {
    setIsLoading(true);
    await axios
      .get(BASE_URL + "/categories")
      .then((res) => {
        let categoriesInfo = res.data;
        setCategoriesInfo(categoriesInfo.payload);
      })
      .catch((e) => {
        console.log("An error occurred at API-Categories - " + e);
        console.log("Message: " + e.response.status);
      });
    setIsLoading(false);
  };

  const categories_recommends = async () => {
    setIsLoading(true);
    await axios
      .get(BASE_URL + "/categories-recommends")
      .then((res) => {
        let categoriesInfo = res.data;
        setCategoriesRecommendsInfo(categoriesInfo.payload);
      })
      .catch((e) => {
        console.log(`An error occurred at API-categories_recommends: ${e}`);
        console.log(`Message: ${e.response.status}`);
      });
    setIsLoading(false);
  };

  const products = async () => {
    setIsLoading(true);
    await axios
      .get(BASE_URL + "/products")
      .then((res) => {
        let productsInfo = res.data;
        setProductsInfo(productsInfo.payload);
      })
      .catch((e) => {
        console.log("An error occurred while loadding API-products: " + e);
        console.log("Message: " + e.response.status);
      });
    setIsLoading(false);
  };

  const prodsItem = async (categoriesRecommend) => {
    setIsLoading(true);
    const catRecom =
      categoriesRecommend &&
      categoriesRecommend.filter((item) => {
        item.name.toLowerCase().includes("nổi bật");
      });

    console.log("catId: " + catRecom.id + "; catName: " + catRecom.name);
    if (catId != null) {
      await axios
        .get(BASE_URL + "/category/" + catId + "/products")
        .then((res) => {
          let prodsItemInfo = res.data;
          setProdsItemInfo(prodsItemInfo.payload);
          console.log(
            "Prods Item Info: " + JSON.stringify(prodsItemInfo.payload),
          );
        })
        .catch((e) => {
          console.log("An error occurred while loadding API-prodsItem: " + e);
          console.log("Message: " + e.response.status);
        });
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    categories();
    categories_recommends();
    products();
    prodsItem(categoriesRecommendsInfo);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        categoriesInfo,
        categoriesRecommendsInfo,
        productsInfo,
        prodsItemInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
