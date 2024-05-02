import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import TopHeader from "../components/headers/TopHeader";
import LegendTransfers from "../components/charts/LegendTransfers";
import LegendOrders from "../components/charts/LegendOrders";
import createAxios from "../utils/axios";
import { DefaultTheme } from "../themes/DefaultTheme";

const API = createAxios();

function Home({ navigation }) {
  const [transferData, setTransferData] = useState([
    {
      value: 0,
      text: "",
      color: "#006DFF",
      gradientCenterColor: "#006DFF",
    },
    {
      value: 0,
      text: "",
      color: "#3BE9DE",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: 0,
      text: "",
      color: "#FF7F97",
      gradientCenterColor: "#FF7F97",
      focused: true,
    },
  ]);
  const [orderData, setOrderData] = useState([
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ]);
  const [dayBack, setDayBack] = useState(9999);
  const [userInfo, setUserInfo] = useState({
    noti: 0,
    data: null,
  });

  const fetchData = async (dayBack) => {
    const response = await API.get("/station/dashboards?dayBack=" + dayBack);
    if (response.statusCode === 200) {
      const newTransferData = [...transferData];

      // [0] Transfer received
      (newTransferData[0].value = response.payload.totalTransferReceived),
        (newTransferData[0].text =
          response.payload.totalTransferReceived + "%"),
        // [1] Transfer not received
        (newTransferData[1].value = response.payload.totalTransferNotReceived),
        (newTransferData[1].text =
          response.payload.totalTransferNotReceived + "%"),
        // [2] Transfer pending
        (newTransferData[2].value = response.payload.totalTransferPending),
        (newTransferData[2].text = response.payload.totalTransferPending + "%"),
        setTransferData(newTransferData);
    }
  };

  const fetchNotification = async () => {
    const response = await API.get("/station/notifications/aboutTransfer");
    if (response.statusCode === 200) {
      setUserInfo({
        ...userInfo,
        noti: response.payload.length,
        data: response.payload,
      });
    }
  };

  useEffect(() => {
    fetchData(dayBack);
    fetchNotification();
  }, [dayBack]);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <TopHeader
        label="Trạm - FTA"
        userInfo={userInfo}
        onNotiIconPress={() => {
          navigation.navigate("Notification", {
            data: userInfo.data,
          });
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            marginVertical: 8,
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 20,
            backgroundColor: "#232B5D",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Tỉ lệ vận chuyển - Hôm nay còn{" "}
            {transferData[0].value === 0 ? 0 : transferData[0].value} chuyển
            hàng
          </Text>
          <View style={{ padding: 20, alignItems: "center" }}>
            <PieChart
              data={transferData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {transferData[0].text}
                    </Text>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      Đã xử lý
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <LegendTransfers
            value1={transferData[0].text}
            value2={transferData[1].text}
            value3={transferData[2].text}
          />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 20,
            backgroundColor: "#232B5D",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Tỉ lệ đơn hàng
          </Text>
          <View style={{ padding: 20, alignItems: "center" }}>
            <PieChart
              data={orderData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      47%
                    </Text>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      Excellent
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <LegendOrders
            value1={orderData[0].value}
            value2={orderData[1].value}
            value3={orderData[2].value}
            value4={orderData[3].value}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
});
