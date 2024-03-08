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
  const [prodsInfo, setProdsInfo] = useState(null);
  const [prodsItemInfo, setProdsItemInfo] = useState(null);
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

  const products = () => {
    setIsLoading(true);
    axios
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

  // const catRecomFilter = (catIds) => {
  //   return catIds && Array.isArray(catIds)
  //     ? catIds
  //         .filter((items) => items.name.toLowerCase().includes("nổi bật"))
  //         .map((item) => item.id)
  //     : [];
  // };

  // const prods = async () => {
  //   categories_recommends();
  //   setIsLoading(true);
  //
  //   const catId = catRecomFilter(categoriesRecommendsInfo);
  //   console.log("catId: " + catId);
  //   catId &&
  //     (await axios
  //       .get(BASE_URL + "/category/" + catId + "/products")
  //       .then((res) => {
  //         let prodsInfo = res.data;
  //         setProdsInfo(prodsInfo.payload);
  //         console.log("prods: " + prodsInfo.payload);
  //       })
  //       .catch((e) => {
  //         console.log("An error occurred while loadding API-prods: " + e);
  //         console.log("Message: " + e.response.status);
  //       }));
  //
  //   setIsLoading(false);
  // };
  //
  // const prodsItemFilter = (prodIds) => {
  //   return prodIds && Array.isArray(prodIds)
  //     ? prodIds.map((item) => item.id)
  //     : [];
  // };

  const prodsItem = async () => {
    // prods();
    setIsLoading(true);

    // const prodId = prodsItemFilter(prodsInfo);
    // console.log("prodsInfo: " + prodsInfo);
    // console.log("prodId: " + prodId);
    // prodId &&
    //   (await axios
    //     .get(BASE_URL + "/product/" + prodId + "/product-items")
    //     .then((res) => {
    //       let prodsItemInfo = res.data;
    //       setProdsItemInfo(prodsItemInfo.payload);
    //       console.log(
    //         "ProdsItem Info: " + JSON.stringify(prodsItemInfo.payload),
    //       );
    //     })
    //     .catch((e) => {
    //       console.log("An error occurred while loadding API-prodsItem: " + e);
    //       console.log("Message: " + e.response.status);
    //     }));

    await axios
      .get(BASE_URL + "/categories-recommends")
      .then((res) => {
        let categoriesInfo = res.data;
        let categoryRecomId = categoriesInfo.payload
          .filter((items) => items.name.toLowerCase().includes("nổi bật"))
          .map((item) => item.id);
        categoryRecomId &&
          axios
            .get(BASE_URL + "/category/" + categoryRecomId + "/products")
            .then((res) => {
              let prodsInfo = res.data;
              let prodRecomId = prodsInfo.payload.map((item) => item.id);
              console.log("prodRecomId: " + prodRecomId);
              prodRecomId &&
                axios
                  .get(BASE_URL + "/product/" + prodRecomId + "/product-items")
                  .then((res) => {
                    let prodsItemInfo = res.data;
                    setProdsItemInfo(prodsItemInfo.payload);
                    console.log(
                      "ProdsItem Info: " +
                        JSON.stringify(prodsItemInfo.payload),
                    );
                  })
                  .catch((e) => {
                    console.log(
                      "An error occurred while loadding API-prodsItem: " + e,
                    );
                    console.log("Message: " + e.response.status);
                  });
            })
            .catch((e) => {
              console.log("An error occurred while loadding API-prods: " + e);
              console.log("Message: " + e.response.status);
            });
      })
      .catch((e) => {
        console.log(`An error occurred at API-categories_recommends: ${e}`);
        console.log(`Message: ${e.response.status}`);
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
    categories_recommends();
    products();
    prodsItem();
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
