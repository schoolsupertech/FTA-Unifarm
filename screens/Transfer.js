import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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

function Transfer({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataTransfer, setDataTransfer] = useState([]);
  const [dataTransferDone, setDataTransferDone] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [aboutMe, setAboutMe] = useState();

  const getDataAboutMe = async () => {
    try {
      const response = await API.get("/aboutMe");
      if (response) {
        console.log("Success get aboutMe 1");
        setAboutMe(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataAboutMe();
  }, []);

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

  const fetchDataAll = async () => {
    try {
      const response = await API.get(
        `/transfers/getall?stationId=${aboutMe.station.id}&page=0&pageSize=10`,
      );
      if (response) {
        console.log("Success get dataAll");
        console.log("DataAll", response);
        setDataAll(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataTransfer = async () => {
    try {
      const response = await API.get(
        `/transfers/getall?stationId=${aboutMe.station.id}&status=Pending&page=0&pageSize=10`,
      );
      if (response) {
        console.log("Success get dataTransfer");
        console.log("Datatransfer", response);
        setDataTransfer(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataTransferDone = async () => {
    try {
      const response = await API.get(
        `/transfers/getall?stationId=${aboutMe.station.id}&status=Received&page=0&pageSize=10`,
      );
      if (response) {
        console.log("Success get dataTransferDone");
        console.log("DatatransferDone", response);
        setDataTransferDone(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changTransferStatus = async (id) => {
    try {
      const response = await API.put("/transfer/update", {
        id: id,
        status: "Received",
        noteReceived: "Đã nhận đủ hàng",
      });
      if (response) {
        console.log("Success change Transfer Done");
        Alert.alert("Thông báo", `Xác nhận vận chuyển thành công!`);
        fetchDataTransfer();
        fetchDataTransferDone();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aboutMe) {
      fetchDataTransfer();
      fetchDataTransferDone();
      fetchDataAll();
    }
  }, [aboutMe]);

  function formatDatePicked(datePicked) {
    const dateFormated = new Date(datePicked);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <TopHeader label="Vận chuyển" />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <SegmentedControl
            values={["Tất cả", "Chưa xác nhận", "Đã xác nhận"]}
            selectedIndex={selectedIndex}
            fontStyle={{ fontWeight: 500 }}
            onChange={(e) => {
              setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        {selectedIndex === 0 &&
          (dataAll.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={dataAll}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("DetailTransfer", {
                        transferId: item.id,
                      })
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
                        uri: "https://img.freepik.com/free-vector/isometric-car-icon-isolated-white_107791-132.jpg?t=st=1710403441~exp=1710407041~hmac=6a319d5099d8eeab4dce39eb37575f989979255e0d6e377d0946b54238723d10&w=1380",
                      }}
                      style={{ height: 80, width: 80, borderRadius: 5 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        marginLeft: 25,
                        borderWidth: 0,
                        borderColor: "red",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{ fontWeight: "bold", marginBottom: 5 }}
                        numberOfLines={1}
                      >
                        Mã vận chuyển: {item.code}
                      </Text>
                      {item.status === "Pending" ? (
                        <Text>
                          Ngày dự kiến: ...
                          {formatDatePicked(item.expectedReceiveDate)}
                        </Text>
                      ) : (
                        <>
                          <Text>
                            Ngày nhận: ...{formatDatePicked(item.receivedDate)}
                          </Text>
                          <Text>Ghi chú: {item.noteReceived}</Text>
                        </>
                      )}
                      <Text
                        style={{
                          marginTop: 10,
                          color: status[item.status].color,
                          fontWeight: "700",
                        }}
                      >
                        {status[item.status].name}
                      </Text>
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
                Không có vận chuyển..
              </Text>
            </View>
          ))}
        {selectedIndex === 1 &&
          (dataTransfer.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={dataTransfer}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailTransfer", {
                        transferId: item.id,
                      })
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
                        uri: "https://img.freepik.com/free-vector/isometric-car-icon-isolated-white_107791-132.jpg?t=st=1710403441~exp=1710407041~hmac=6a319d5099d8eeab4dce39eb37575f989979255e0d6e377d0946b54238723d10&w=1380",
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
                        Mã vận chuyển: {item.code}
                      </Text>
                      <Text>
                        Ngày bắt đầu: {formatDatePicked(item.createdAt)}
                      </Text>
                      <Text>
                        Ngày dự kiến: ...
                        {formatDatePicked(item.expectedReceiveDate)}
                      </Text>
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
                                  onPress: () => changTransferStatus(item.id),
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
              <Icon name={"file-tray-stacked"} size={70} color={"grey"} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "grey",
                  marginTop: 15,
                }}
              >
                Không có vận chuyển..
              </Text>
            </View>
          ))}
        {selectedIndex === 2 &&
          (dataTransferDone.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <FlatList
                data={dataTransferDone}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailTransfer", {
                        transferId: item.id,
                      })
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
                        uri: "https://img.freepik.com/free-vector/isometric-car-icon-isolated-white_107791-132.jpg?t=st=1710403441~exp=1710407041~hmac=6a319d5099d8eeab4dce39eb37575f989979255e0d6e377d0946b54238723d10&w=1380",
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
                        Mã vận chuyển: {item.code}
                      </Text>
                      <Text>
                        Ngày nhận: ...{formatDatePicked(item.receivedDate)}
                      </Text>
                      <Text>Ghi chú: {item.noteReceived}</Text>
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
                Không có vận chuyển..
              </Text>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default Transfer;

const styles = StyleSheet.create({});
