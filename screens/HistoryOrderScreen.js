import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ActivityIndicator, ToggleButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import GroupOrderItems from "../components/common/GroupOrderItems";
import LoadingIndicator from "../components/common/LoadingIndicator";
import TrackingOrderModal from "../components/ui/order/TrackingOrderModal";
import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/colors";

const API = createAxios();

function HistoryOrderScreen({ navigation, route }) {
  const status = route.params?.status;
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const statusOptions = [
    {
      status: "Pending",
      title: "Chờ xác nhận",
      style: {
        color: "lightskyblue",
        fontWeight: "500",
      },
    },
    {
      status: "Confirmed",
      title: "Chờ vận chuyển",
      style: {
        color: "lightseagreen",
        fontWeight: "500",
      },
    },
    {
      status: "OnDelivery",
      title: "Đang vận chuyển",
      style: {
        color: "seagreen",
        fontWeight: "500",
      },
    },
    {
      status: "ReadyForPickup",
      title: "Chờ nhận hàng",
      style: {
        color: "dodgerblue",
        fontWeight: "500",
      },
    },
    {
      status: "PickedUp",
      title: "Đã nhận hàng",
      style: {
        color: "limegreen",
        fontWeight: "500",
      },
    },
    {
      status: "Cancelled",
      title: "Đơn huỷ",
      style: {
        color: "orangered",
        fontWeight: "500",
      },
    },
    {
      status: "Expired",
      title: "Hết hạn",
      style: {
        color: "crimson",
        fontWeight: "500",
      },
    },
  ];

  useEffect(() => {
    if (status) {
      fetchOrderByStatus(status);
    } else {
      fetchOrder();
    }
  }, [status]);

  async function fetchOrder() {
    setIsLoading(true);
    API.customRequest("get", "/orders/get-all", null, authState?.token).then(
      (response) => {
        if (response.statusCode === 200) {
          setOrders(response.payload);
        } else {
          if (response.response) {
            console.log(
              "Fetch error: " + JSON.stringify(response.response, null, 2),
            );
          } else {
            setOrders(response.payload);
          }
        }
      },
    );
    setIsLoading(false);
  }

  async function fetchOrderByStatus(status) {
    setIsLoading(true);
    await API.customRequest(
      "get",
      "/orders/get-all?status=" + status,
      null,
      authState?.token,
    ).then((response) => {
      if (response.statusCode === 200) {
        setOrders(response.payload);
      } else {
        if (response.response) {
          console.log(
            "Fetch error: " + JSON.stringify(response.response, null, 2),
          );
        } else {
          setOrders(response.payload);
        }
      }
    });
    setIsLoading(false);
  }

  async function onCancelHandler(orderId) {
    console.log("Order id: " + orderId);
    const response = await API.customRequest(
      "PUT",
      "/order/cancel/" + orderId,
      null,
      authState?.token,
    );
    if (response.statusCode === 200) {
      Alert.alert(
        "Huỷ đơn hàng thành công!",
        "Hãy kiểm tra tiền đã được hoàn vào ví chưa nhé!",
        [{ text: "OK" }],
      );
      fetchOrder();
    } else {
      console.log("Oops! Something went wrong\n" + response);
    }
  }

  async function modalPresent(trackingOrderId) {
    const response = await API.customRequest(
      "get",
      "/order/tracking/" + trackingOrderId,
      null,
      authState?.token,
    );

    if (response.statusCode >= 200 && response.statusCode < 300) {
      const payload = {
        data: response.payload,
        currentPosition: response.payload.length,
      };

      console.log("Payload: " + JSON.stringify(payload, null, 2));

      setModalData(payload);
      setModalVisible(true);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        {modalVisible && (
          <TrackingOrderModal
            data={modalData}
            isVisible={modalVisible}
            onVisible={() => setModalVisible(false)}
          />
        )}
        <View style={{ marginBottom: 8 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {statusOptions.map((item, index) => (
              <View key={index} style={styles.toggleBtnContainer}>
                <ToggleButton
                  icon={() => <Text style={item.style}>{item.title}</Text>}
                  value={item.status}
                  onPress={() => fetchOrderByStatus(item.status)}
                  style={[styles.toggleBtn, { borderColor: item.style.color }]}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          style={[{ flex: 1 }, DefaultTheme.scrollContainer]}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((item) => (
              <GroupOrderItems
                key={item.id}
                order={item}
                onCancel={onCancelHandler}
                onTracking={() => modalPresent(item.id)}
              />
            ))
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 300,
                paddingVertical: 20,
              }}
            >
              <Ionicons name="bag-remove-outline" size={100} color="gray" />
              <Text style={styles.textEmptyCart}>Bạn chưa có đơn hàng nào</Text>
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "center",
                  borderBottomWidth: 0.5,
                  borderColor: Colors.primaryGreen700,
                }}
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.primaryGreen700,
                  }}
                >
                  Mua thêm{" "}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HistoryOrderScreen;

const styles = StyleSheet.create({
  toggleBtn: {
    width: "auto",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  toggleBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  textEmptyCart: {
    color: "gray",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  modalContainer: {
    justifyContent: "center",
  },
});
