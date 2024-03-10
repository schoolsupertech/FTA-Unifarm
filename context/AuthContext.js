import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../api/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // const [categoriesRecommendsInfo, setCategoriesRecommendsInfo] =
  //   useState(null);
  const [categoriesInfo, setCategoriesInfo] = useState(null);
  const [productsInfo, setProductsInfo] = useState(null);
  const [prodsInfo, setProdsInfo] = useState(null);
  const [prodsItemInfo, setProdsItemInfo] = useState(null);
  const [prodItemInfo, setProdItemInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const categories = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "/categories")
      .then((res) => {
        let categoriesInfo = res.data;
        setCategoriesInfo(categoriesInfo.payload);
      })
      .catch((e) => {
        console.log("An error occurred while loading API-Categories - " + e);
        console.log("Message: " + e.response.status);
      });
    setIsLoading(false);
  };

  // const categories_recommends = async () => {
  //   setIsLoading(true);
  //   await axios
  //     .get(BASE_URL + "/categories-recommends")
  //     .then((res) => {
  //       let categoriesInfo = res.data;
  //       setCategoriesRecommendsInfo(categoriesInfo.payload);
  //     })
  //     .catch((e) => {
  //       console.log(`An error occurred while loading API-categories_recommends: ${e}`);
  //       console.log(`Message: ${e.response.status}`);
  //     });
  //   setIsLoading(false);
  // };

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

  const prodItemDetail = async (prodItemId) => {
    setIsLoading(true);

    await axios
      .get(BASE_URL + "/product-item" + prodItemId)
      .then((res) => {
        let prodItemDetailInfo = res.data;
        setProdItemInfo(prodItemDetailInfo.payload);
        console.log(
          "prodItemDetailInfo: " + JSON.stringify(prodItemDetailInfo.payload),
        );
      })
      .catch((e) => {
        console.log("An error occurred while loading API-prodItemDetail: " + e);
        console.log("Message: " + e.response.status);
      });

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
    // categories_recommends();
    products();
    // prodsItem();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        categoriesInfo,
        // categoriesRecommendsInfo,
        productsInfo,
        // prodsItemInfo,
        // prodItemDetail,
        // prodItemInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
