import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Header from "../components/Header";
import createAxios from "../utils/axios";
import { ButtonFlex } from "../components/Buttons";

const API = createAxios();

function DetailTransfer({ navigation, route }) {
  const transfer = route.params?.transfer;
  const [dataOrder, setDataOrder] = useState([]);

  console.log(
    "Detail transfer get route: " + JSON.stringify(transfer, null, 2),
  );

  const status = {
    Resend: {
      name: "Gửi lại",
      color: "orange",
    },
    Received: {
      name: "Đã đến",
      color: "#32b768",
    },
    none: {
      name: "Đã hủy",
      color: "red",
    },
    Pending: {
      name: "Đang vận chuyển",
      color: "#00B2FF",
    },
    NotReceived: {
      name: "Không nhận được",
      color: "#FF0040",
    },
  };

  async function fetchDataOrderOfTransfer() {
    try {
      const response = await API.get(`/orders/${transfer.id}`);
      if (response.statusCode === 200) {
        console.log("Success get dataOrder");
        console.log(JSON.stringify(response.payload, null, 2));
        setDataOrder(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeOrderStatus(id, orderId, stationId) {
    try {
      const response = await API.put("/station/orders/update-status", {
        transferId: id,
        orderIds: [orderId],
        stationId: stationId,
        deliveryStatus: "AtStation",
      });
      if (response.statusCode === 200) {
        console.log("Update order status successed!");
        Alert.alert("Thông báo", "Xác nhận đơn hàng thành công!");
        fetchDataOrderOfTransfer();
      } else {
        Alert.alert("Thông báo 😀", "Có gì đó sai sai!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (transfer) fetchDataOrderOfTransfer();
  }, [transfer]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Thông tin vận chuyển"}
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
      />
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/isometric-car-icon-isolated-white_107791-132.jpg?t=st=1710403441~exp=1710407041~hmac=6a319d5099d8eeab4dce39eb37575f989979255e0d6e377d0946b54238723d10&w=1380",
            }}
            style={{ height: 180, width: 180, borderRadius: 5 }}
            resizeMode="cover"
          />
          <Text
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontSize: 18,
              fontWeight: "bold",
              color: status[transfer.status].color,
            }}
          >
            {status[transfer.status].name}
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.textTitle}>Người tạo</Text>
            <Text style={styles.textInfo}>{transfer.collected.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.textTitle}>Thời gian tạo</Text>
            <Text style={styles.textInfo}>{transfer.createdAt}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.textTitle}>Ghi chú gửi</Text>
            <Text style={styles.textInfo}>{transfer.noteSend}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.textTitle}>Ngày nhận</Text>
            <Text style={styles.textInfo}>{transfer.updatedAt}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.textTitle}>Ghi chú nhận</Text>
            <Text style={styles.textInfo}>{transfer.noteReceived}</Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            marginBottom: 20,
            backgroundColor: "white",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon name="warehouse" size={80} color={"grey"} />
            <Text style={[styles.textTitle, { textAlign: "center" }]}>
              {transfer.collected.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 0,
            backgroundColor: "white",
          }}
        >
          <Icon name="power-on" size={80} color={"#d5d5d5"} />
        </View>

        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: 20,
            marginBottom: 0,
            backgroundColor: "white",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon name="store-marker-outline" size={80} color={"grey"} />
            <Text style={[styles.textTitle, { textAlign: "center" }]}>
              {transfer.station.name}
            </Text>
          </View>
        </View>
        <View style={{ padding: 20, marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Đơn hàng</Text>
          {dataOrder.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={{
                backgroundColor: "white",
                padding: 10,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 5,
                borderRadius: 10,
                elevation: 2,
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "transparent",
              }}
            >
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/3d-delivery-box-parcel_78370-825.jpg?t=st=1710488199~exp=1710491799~hmac=bb0b92125aa7e596e698e42346747ab817a4d059be7720edfc2038eb86cf9900&w=826",
                }}
                style={{ height: 80, width: 80, borderRadius: 5 }}
                resizeMode="cover"
              />
              <View
                style={{
                  marginLeft: 10,
                  borderWidth: 0,
                  borderColor: "red",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Mã đơn hàng: {item.code}
                </Text>
                <Text style={{}}>
                  KH: {item.customerResponse.firstName}{" "}
                  {item.customerResponse.lastName}
                </Text>
                <Text style={{ alignSelf: "flex-end", fontWeight: "bold" }}>
                  {item.totalAmount} đ
                </Text>
              </View>
              {item.transferResponse?.status === "Received" &&
                item.deliveryStatus === "OnTheWayToStation" && (
                  <View style={{ alignSelf: "flex-end", marginTop: 8 }}>
                    <ButtonFlex
                      title="Xác nhận"
                      stylesButton={{
                        paddingHorizontal: 24,
                        paddingVertical: 8,
                      }}
                      stylesText={{ fontWeight: "bold", fontSize: 12 }}
                      onPress={() => {
                        Alert.alert("Xác nhận", "Đơn hàng này đã đến?", [
                          {
                            text: "Huỷ",
                            onPress: () => console.log("Cancel pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Ok",
                            onPress: () =>
                              changeOrderStatus(
                                item.transferResponse.id,
                                item.id,
                                item.stationResponse.id,
                              ),
                          },
                        ]);
                      }}
                    />
                  </View>
                )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "500",
    width: "70%",
    textAlign: "right",
  },
});
