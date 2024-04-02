import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TopHeader from "../components/common/headers/TopHeader";
import LocationOptions from "../components/ui/home/LocationOptions";
import HeaderContent from "../components/common/HeaderContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();

function TodayScreen() {
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);
  const [searchPrd, setSearchPrd] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState("");
  const [onCartAdded, setOnCartAdded] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState({
    isVisible: false,
    status: null,
  });
  const [prodItemsInfo, setProdItemsInfo] = useState([]);
  //////////////////////////////
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePicked, setDatePicked] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDatePicked(date);
    hideDatePicker();
  };
  ///////////////////////////////////////

  function formatDatePicked(datePicked) {
    const day = datePicked.getDate();
    const month = datePicked.getMonth() + 1;
    const year = datePicked.getFullYear();
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      const fetchProdItems = async (prodItemId) => {
        const prodItemsInfoResponse = await API.get(
          "/product/" + prodItemId + "/product-items",
        );
        // const newProdItemsInfo = Object.fromEntries(
        //   Object.entries(prodItemsInfo),
        // );
        setProdItemsInfo((oldProdItemsInfo) => [
          ...oldProdItemsInfo,
          ...prodItemsInfoResponse.payload,
        ]);
      };

      const catRecomResponse = await API.get("/categories-recommends");

      let categoryRecomId = catRecomResponse.payload
        .filter((items) => items.name.toLowerCase().includes("nổi bật"))
        .map((item) => item.id);

      if (categoryRecomId) {
        const prodsInfoResponse = await API.get(
          "/category/" + categoryRecomId + "/products",
        );
        prodsInfoResponse.payload.map((item) => {
          fetchProdItems(item.id);
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchingUserLocation = async () => {
      const response = await API.customRequest(
        "get",
        "/apartment-station",
        authState?.token,
      );

      if (response.response?.status == 400) {
        Alert.alert(
          "Lần đầu đăng nhập?",
          "Bạn cần phải chọn vị trí của bạn để chúng tôi giao hàng cho bạn.",
          [{ text: "OK" }],
        );
        setLocationModalVisible({
          ...locationModalVisible,
          isVisible: true,
          status: response.response.status,
        });
      }
    };

    fetchingUserLocation();
  }, []);

  async function updateLocationHandler(apartmentData, stationData, isDefault) {
    if (apartmentData && stationData) {
      const response = await API.customRequest(
        "/post",
        "/apartment-station/upsert",
        {
          stationId: stationData.id,
          apartmentId: apartmentData.id,
          isDefault: isDefault,
        },
        authState?.token,
      );
      console.log("Save location: " + JSON.stringify(response, null, 2));
      if (response) {
        Alert.alert("Cập nhật vị trí thành công", [
          {
            text: "OK",
          },
        ]);
        setLocationModalVisible({
          ...locationModalVisible,
          isVisible: false,
          status: null,
        });
      }
    } else {
      Alert.alert("Xin quý khách hãy nhập đầy đủ thông tin", [
        {
          text: "OK",
        },
      ]);
    }
  }

  function onCancelUpdateLocationHandler() {
    if (locationModalVisible.status === 400) {
      Alert.alert(
        "Quý khách chưa chọn địa điểm",
        "Quý khách chắc chắn muốn thoát?",
        [
          {
            text: "Có",
            style: "cancel",
            onPress: () =>
              setLocationModalVisible({
                ...locationModalVisible,
                isVisible: false,
                status: null,
              }),
          },
          {
            text: "Huỷ bỏ",
          },
        ],
      );
    } else {
      setLocationModalVisible({
        ...locationModalVisible,
        isVisible: false,
        status: null,
      });
    }
  }

  function renderProdItem(item) {
    const prodItemProps = {
      id: item.id,
      title: item.title,
      // sold: item.sold,
      // openDate: item.openDate,
      source: item.productOrigin,
      description: item.description,
      // moreInfo: item.moreInfo,
      price: item.price,
      // listedPrice: item.listedPrice,
      unit: item.unit,
      outOfStock: item.outOfStock,
      quantity: item.quantity,
      // gallery: item.gallery,
    };

    function AddingCartHandler(cartAdded) {
      if (authState?.authenticated) {
        setVisible(true);
        if (cartAdded) {
          setOnCartAdded(cartAdded);
          setSnackbarLabel("Đã thêm vào giỏ hàng");
        }
      } else {
        setVisible(true);
        setSnackbarLabel("Bạn cần phải đăng nhập trước");
      }
    }

    return (
      <CardProdItem
        key={prodItemsInfo.id}
        {...prodItemProps}
        onAddingCart={AddingCartHandler}
      />
    );
  }

  function displaySearchPrdText(prdSearch) {
    setSearchPrd(prdSearch);
    console.log(searchPrd);
  }

  function selectedCategoriesStack() {
    navigation.navigate("CategoryTab");
  }

  return (
    <SafeAreaView style={[DefaultTheme.root]}>
      <LinearGradient
        colors={["white", Colors.primaryGreen900]}
        style={styles.linearGradient}
      >
        <TopHeader
          onCartIconPress={() => {
            authState?.authenticated
              ? navigation.navigate("CartScreen")
              : navigation.navigate("Profile");
          }}
          onNotiIconPress={() => {
            navigation.navigate("Notification");
          }}
        />
        <View style={styles.headerLocation}>
          <View style={styles.headerLocationContent}>
            <Ionicons
              name="location"
              color={Colors.primaryGreen800}
              size={20}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: Colors.primaryGreen800,
              }}
            >
              {" "}
            </Text>
          </View>
          <TouchableOpacity
            style={{}}
            onPress={() =>
              authState?.authenticated &&
              setLocationModalVisible({
                ...locationModalVisible,
                isVisible: true,
                status: 0,
              })
            }
          >
            <Text style={styles.textLocation}>
              Thủ Đức, Tp. Hồ Chí Minh <Ionicons name="arrow-down" />
            </Text>
          </TouchableOpacity>
        </View>
        <LocationOptions
          visible={locationModalVisible}
          onPress={updateLocationHandler}
          onCancel={onCancelUpdateLocationHandler}
        />
        {/* <View style={styles.headerMenu}>
          <Text style={styles.textMenu}>
            <Text style={{ fontWeight: "600" }}>
              
              <Text style={{ textDecorationLine: "underline" }}>
                Ngày 26 tháng 01 năm 2024
              </Text>
            </Text>
          </Text>
        </View> */}
        {/* <Searchbar
          placeholder="Tìm kiếm sản phẩm..."
          elevation={1}
          theme={DefaultTheme.searchbar}
          value={searchPrd}
          onChangeText={displaySearchPrdText}
          // onIconPress={() =>
          //   navigation.navigate("SearchScreen", { searchItem: searchPrd })
          // }
        /> */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 5,
            backgroundColor: Colors.primaryGreen50,
          }}
          onPress={showDatePicker}
        >
          <Ionicons
            name="calendar-outline"
            size={25}
            color={Colors.primaryGreen700}
          />
          <Text
            style={{
              color: Colors.primaryGreen700,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {"  "}
            {datePicked && formatDatePicked(datePicked)}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          cancelTextIOS="Đóng"
          confirmTextIOS="Xác nhận"
          buttonTextColorIOS={Colors.primaryGreen700}
        />
      </LinearGradient>

      <ScrollView style={DefaultTheme.scrollContainer}>
        {/* Danh sách sản phẩm */}
        <View style={styles.contentView}>
          <View style={{ marginBottom: 8 }}>
            <HeaderContent>Sản phẩm khuyên dùng</HeaderContent>
          </View>
          {prodItemsInfo?.map((item) => renderProdItem(item))}
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => {}}
        action={{
          label: "Xong",
          onPress: () => setVisible(false),
        }}
      >
        {snackbarLabel}
      </Snackbar>
    </SafeAreaView>
  );
}

export default TodayScreen;

const styles = StyleSheet.create({
  // searchBar: {
  //   flexDirection: "row",
  //   borderColor: "#C6C6C6",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  // },
  linearGradient: {
    width: "100%",
    padding: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  headerLocation: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 12,
  },
  headerLocationContent: {
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textLocation: {
    fontSize: 15,
    color: Colors.primaryGreen800,
    // textDecorationLine: "underline",
    fontWeight: "bold",
  },
  headerMenu: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  textMenu: {
    fontSize: 14,
    color: Colors.primaryGreen100,
  },
  contentView: {
    marginTop: 18,
    // marginVertical: 8,
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryButtonViewAll: {
    color: "#0aada8",
    textDecorationLine: "underline",
  },
});
