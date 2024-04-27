import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import createAxios from "../utils/axios";
import { DefaultTheme } from "../themes/DefaultTheme";
import TopHeader from "../components/headers/TopHeader";

const API = createAxios();

function Profile({ navigation }) {
  const [aboutMe, setAboutMe] = useState();
  const [showStationInfo, setShowStationInfo] = useState(false);

  const getDataAboutMe = async () => {
    try {
      const response = await API.get("/aboutMe");
      if (response) {
        console.log("Success get aboutMe");
        setAboutMe(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataAboutMe();
  }, []);

  const cacheAndCellularItems = [
    {
      icon: "person-circle-outline",
      text: "Cài đặt tài khoản",
      sub: "create-outline",
    },
  ];

  const accountItems = [
    {
      icon: "language-outline",
      text: "Ngôn ngữ",
      sub: "chevron-forward-outline",
    },
    {
      icon: "chatbubble-ellipses-outline",
      text: "Phản hồi",
      sub: "chevron-forward-outline",
    },
    {
      icon: "star-outline",
      text: "Đánh giá ứng dụng",
      sub: "chevron-forward-outline",
    },
    {
      icon: "download-outline",
      text: "Cập nhật",
      sub: "chevron-forward-outline",
    },
  ];

  const handleLogOut = () => {
    navigation.popToTop();
  };

  const renderSettingsItem = ({ icon, text, sub }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <Icon name={icon} size={24} color="grey" />
      <Text
        style={{
          marginLeft: 15,
          fontSize: 15,
          minWidth: 250,
          fontWeight: 500,
        }}
      >
        {text}
      </Text>
      <View style={{ alignSelf: "flex-end" }}>
        <Icon
          name={sub}
          size={24}
          color="grey"
          style={{
            fontWeight: 600,
            fontSize: 24,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <TopHeader label="Tài khoản" />
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemCard}>
          <Image
            source={{
              uri: "https://banner2.cleanpng.com/20180619/epr/kisspng-avatar-photo-booth-computer-icons-email-stewardess-5b292bfebc29e1.5698032815294248947707.jpg",
            }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
          <View
            style={{
              height: 100,
              marginLeft: 25,
              paddingVertical: 32,
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, fontWeight: 500 }}>
              {aboutMe && aboutMe.firstName} {aboutMe && aboutMe.lastName}
            </Text>
            <Text style={{ fontSize: 13, color: "grey", fontWeight: 500 }}>
              {aboutMe && aboutMe.email}
            </Text>
          </View>
          <View>
            <Icon name="notifications-outline" size={26} color={"grey"} />
          </View>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
              Thông tin trạm
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#d5d5d5",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ lineHeight: 30, fontSize: 17, fontWeight: "500" }}>
                {aboutMe && aboutMe.station.name}
              </Text>
              {showStationInfo ? (
                <>
                  <Text
                    style={{
                      lineHeight: 30,
                      fontSize: 14,
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                      Mã số:
                    </Text>{" "}
                    {aboutMe && aboutMe.station.code}
                  </Text>
                  <Text
                    style={{
                      lineHeight: 30,
                      fontSize: 14,
                      fontWeight: "500",
                      color: "grey",
                      width: "80%",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                      Địa chỉ:
                    </Text>{" "}
                    {aboutMe && aboutMe.station.address}
                  </Text>
                  <Pressable
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setShowStationInfo(false);
                    }}
                  >
                    {/* <Icon name="notifications-outline" size={30} color={"grey"}/> */}
                    <Text style={{ fontWeight: "bold", color: "#2C72F5" }}>
                      Thu gọn
                    </Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => {
                    setShowStationInfo(true);
                  }}
                >
                  {/* <Icon name="notifications-outline" size={30} color={"grey"}/> */}
                  <Text style={{ fontWeight: "bold", color: "#2C72F5" }}>
                    Chi tiết
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
              Tài khoản
            </Text>
            <View
              style={{
                backgrounColor: "grey",
                borderRadius: 5,
                overflow: "hidden",
                elevation: 2,
              }}
            >
              {cacheAndCellularItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
              Cài đặt
            </Text>
            <View
              style={{
                borderRadius: 5,
                backgrounColor: "grey",
                overflow: "hidden",
                elevation: 2,
              }}
            >
              {accountItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={handleLogOut}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemCard: {
    height: 80,
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  btnContainer: {
    backgroundColor: "red",
    height: 35,
    width: 130,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  top: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 80,
  },
});
