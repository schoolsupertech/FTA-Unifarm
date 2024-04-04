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
import TopHeaderLogin from "../components/common/headers/TopHeaderLogin";
import LocationOptions from "../components/ui/home/LocationOptions";
import HeaderContent from "../components/common/HeaderContent";
import CardProdItem from "../components/ui/home/CardProdItem";
import createAxios from "../utils/AxiosUtility";
import createFormatUtil from "../utils/FormatUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

const API = createAxios();
const FORMAT = createFormatUtil();

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchProdItems = async (prodItemId) => {
        const prodItemsInfoResponse = await API.get(
          "/product/" + prodItemId + "/product-items",
        );
        const isDuplicate = prodItemsInfo.some(
          (items) =>
            items.id ===
            prodItemsInfoResponse.payload.map((prodId) => prodId.id),
        );

        !isDuplicate &&
          setProdItemsInfo((oldProdItemsInfo) => [
            ...oldProdItemsInfo,
            ...prodItemsInfoResponse.payload,
          ]);
      };

      const catRecomResponse = await API.get("/categories-recommends");

      let categoryRecomId = catRecomResponse.payload.find((items) =>
        items.name.toLowerCase().includes("nổi bật"),
      );

      if (categoryRecomId) {
        const prodsInfoResponse = await API.get(
          "/category/" + categoryRecomId.id + "/products",
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
        key={prodItemProps.id}
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
        {authState?.authenticated ? (
          <>
            <TopHeader
              onCartIconPress={() => navigation.navigate("CartScreen")}
              onNotiIconPress={() => {
                navigation.navigate("Notification");
              }}
            />
            <TouchableOpacity
              onPress={() =>
                authState?.authenticated &&
                setLocationModalVisible({
                  ...locationModalVisible,
                  isVisible: true,
                  status: 0,
                })
              }
              style={styles.headerContent}
            >
              <Ionicons
                name="location"
                size={20}
                color={Colors.primaryGreen800}
              />
              <Text style={styles.headerText}>Thủ Đức, Tp. Hồ Chí Minh </Text>
              <Ionicons
                name="arrow-forward-circle"
                size={16}
                color={Colors.primaryGreen800}
              />
            </TouchableOpacity>
            <LocationOptions
              visible={locationModalVisible}
              onPress={updateLocationHandler}
              onCancel={onCancelUpdateLocationHandler}
            />
          </>
        ) : (
          <TopHeaderLogin
            onLoginPress={() => navigation.navigate("AuthScreen")}
          />
        )}

        <TouchableOpacity style={styles.headerContent} onPress={showDatePicker}>
          <Ionicons name="calendar" size={20} color={Colors.primaryGreen800} />
          <Text style={styles.headerText}>
            {FORMAT.dateFormat(datePicked)}{" "}
          </Text>
          <Ionicons
            name="arrow-forward-circle"
            size={16}
            color={Colors.primaryGreen800}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date("2022-12-30")}
          maximumDate={new Date("2029-12-30")}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          cancelTextIOS="Đóng"
          confirmTextIOS="Xác nhận"
          buttonTextColorIOS={DefaultTheme.btnColor700}
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
  headerContent: {
    width: "auto",
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(220, 255, 220, 0.75)",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.primaryGreen800,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: Colors.primaryGreen800,
  },
  headerLocationContent: {
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
