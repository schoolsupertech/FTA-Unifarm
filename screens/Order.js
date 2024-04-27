import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import MainHeader from "../components/MainHeader";
import createAxios from "../utils/axios";
import { ButtonFlex } from "../components/Buttons";
import { DefaultTheme } from "../themes/DefaultTheme";
import TopHeader from "../components/headers/TopHeader";

const API = createAxios();

function Order({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOrderDone, setDataOrderDone] = useState([]);
  const [aboutMe, setAboutMe] = useState();

  const getDataAboutMe = async () => {
    try {
      const response = await API.get("/aboutMe");
      if (response) {
        console.log("Success get aboutMe");
        setAboutMe(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataAboutMe();
  }, []);

  const fetchDataOrder = async () => {
    try {
      const response = await API.get(
        `/station/orders-contain-transfer?stationId=${aboutMe.station.id}`,
      );
      if (response) {
        console.log("DataOrder", response.payload);
        const filterData = response.payload.filter((e) => {
          return e.deliveryStatus !== "PickedUp";
        });
        setDataOrder(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataOrderDone = async () => {
    try {
      const response = await API.get(
        `/station/orders?stationId=${aboutMe.station.id}&deliveryStatus=PickedUp&orderBy=CreatedAt&isAscending=false&pageIndex=0&pageSize=100`,
      );
      if (response) {
        console.log("DataOrderDone", response.payload);
        setDataOrderDone(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changOrderStatus = async (id, stationId, transferId) => {
    console.log("id", id);
    console.log("stationId", stationId);

    console.log("transferId", transferId);

    try {
      const response = await API.put("/station/orders/update-status", {
        transferId: transferId,
        orderIds: id,
        stationId: stationId,
        deliveryStatus: "PickedUp",
      });
      if (response) {
        console.log("Success change Order Done");
        Alert.alert("Thông báo", `Xác nhận đơn hàng thành công!`);
        fetchDataOrder();
        fetchDataOrderDone();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aboutMe) {
      fetchDataOrder();
      fetchDataOrderDone();
    }
  }, [aboutMe]);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <TopHeader label="Đơn hàng" />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <SegmentedControl
            values={["Chưa nhận", "Đã nhận"]}
            selectedIndex={selectedIndex}
            fontStyle={{ fontWeight: 500 }}
            onChange={(e) => {
              setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        {selectedIndex === 0 &&
          (dataOrder.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={dataOrder}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailOrder", { detailOrder: item })
                    }
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
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                        Mã đơn hàng: {item.code}
                      </Text>
                      <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                        Trạng thái: {item.deliveryStatus}
                      </Text>
                      <Text>
                        Khách hàng: {item.customerResponse.firstName}{" "}
                        {item.customerResponse.lastName}
                      </Text>
                      <Text>Giá: {item.totalAmount} đ</Text>
                      <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
                        <ButtonFlex
                          title="Xác nhận"
                          stylesButton={{
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                          }}
                          stylesText={{ fontWeight: "bold", fontSize: 12 }}
                          onPress={() => {
                            Alert.alert(
                              "Xác nhận",
                              `Các đơn hàng đã được vận chuyển đến ?`,
                              [
                                {
                                  text: "Hủy",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "OK",
                                  onPress: () =>
                                    changOrderStatus(
                                      item.id,
                                      item.stationId,
                                      item.transferResponse.id,
                                    ),
                                },
                              ],
                            );
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 80,
              }}
            >
              <Icon name={"file-tray-stacked"} size={70} color={"#d5d5d5"} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "grey",
                  marginTop: 15,
                }}
              >
                Không có đơn hàng...
              </Text>
            </View>
          ))}
        {selectedIndex === 1 &&
          (dataOrderDone.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={dataOrderDone}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("DetailOrder", { detailOrder: item })
                    }
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
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                        Mã đơn hàng: {item.code}
                      </Text>
                      <Text>Giá: {item.totalAmount} đ</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 80,
              }}
            >
              <Icon name={"file-tray-stacked"} size={70} color={"#d5d5d5"} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "grey",
                  marginTop: 15,
                }}
              >
                Không có đơn hàng...
              </Text>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default Order;

const styles = StyleSheet.create({});
