import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Text as PaperText, Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../common/button/MainButton";
import createAxios from "../../../utils/AxiosUtility";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import { Colors } from "../../../constants/colors";
import Title from "../../common/text/Title";
import HeaderContent from "../../common/HeaderContent";
import InputField from "../../common/text/InputField";

const API = createAxios();

function LocationOptions(props) {
  const [userLocation, setUserLocation] = useState({
    name: "",
    phone: "",
    areaId: "",
    stationId: "",
    apartmentId: "",
    isDefault: false,
  });
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [isApartmentSearching, setIsApartmentSearching] = useState(false);
  const [isStationSearching, setIsStationSearching] = useState(false);
  const [searchingApartment, setSearchingApartment] = useState([]);
  const [searchingStation, setSearchingStation] = useState([]);

  function inputChangingHandler(value, userField) {
    setUserLocation({
      ...userLocation,
      [userField]: value,
    });
  }

  async function onSearchingApartmentHandler(value) {
    if (value) {
      setIsApartmentSearching(true);
      const apartmentValue = value.toLowerCase();
      const apartmentResponse = await API.get("/apartments");
      const apartmentList = apartmentResponse.payload.filter((item) => {
        if (item.address.toLowerCase().match(apartmentValue)) {
          return item;
        }
      });
      setSearchingApartment(...searchingApartment, apartmentList);
    }
  }

  async function onSearchingStationHandler(value) {
    if (value) {
      setIsStationSearching(true);
      const stationValue = value.toLowerCase();
      const stationResponse = await API.get("/stations");
      const stationList = stationResponse.payload.filter((item) => {
        if (item.address.toLowerCase().match(stationValue)) {
          return item;
        }
      });
      setSearchingStation(...searchingStation, stationList);
    }
  }

  function renderSearching(item) {
    function onSelectApartmentHandler() {
      setIsApartmentSearching(false);
      setApartmentInfo(item);
      setSearchingApartment(item.address);
      console.log("Apartment address: " + JSON.stringify(item, null, 2));
    }

    function onSelectStationHandler() {
      setIsStationSearching(false);
      setStationInfo(item);
      setSearchingStation(item.address);
      console.log("Station address: " + JSON.stringify(item, null, 2));
    }

    return (
      <TouchableOpacity
        onPress={
          isApartmentSearching
            ? onSelectApartmentHandler
            : isStationSearching && onSelectStationHandler
        }
        style={styles.dropdownItem}
      >
        <View style={styles.dropdownSearching}>
          <Text style={styles.dropdownText} numberOfLines={2}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Modal visible={props.visible.isVisible} animationType="slide">
      <View style={DefaultTheme.root}>
        <View style={styles.title}>
          <PaperText
            variant="headlineMedium"
            style={{ fontWeight: "bold", fontSize: 20 }}
          >
            Cập Nhật Địa Điểm
          </PaperText>
        </View>
        <ScrollView
          style={[
            DefaultTheme.scrollContainer,
            DefaultTheme.flex_1,
            { paddingBottom: 20, marginBottom: 20 },
          ]}
        >
          <View style={styles.modalView}>
            <View style={styles.locationContainer}>
              <View style={{ marginBottom: 8 }}>
                <HeaderContent>Liên hệ</HeaderContent>
              </View>
              <InputField
                label={"Tên người nhận hàng"}
                icon={
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="grey"
                    style={{ marginRight: 6 }}
                  />
                }
                maxLength={100}
                value={userLocation.name}
                onChangeText={(value) => inputChangingHandler(value, "name")}
              />
              <InputField
                label={"Số điện thoại liên hệ"}
                icon={
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="grey"
                    style={{ marginRight: 6 }}
                  />
                }
                maxLength={10}
                keyboardType={"number-pad"}
                autoCapitalize="none"
                autoCorrect={false}
                value={userLocation.phone}
                onChangeText={(value) => inputChangingHandler(value, "phone")}
              />
            </View>
            <View style={styles.locationContainer}>
              <View style={{ marginBottom: 8 }}>
                <HeaderContent>Địa chỉ liên lạc</HeaderContent>
              </View>
              <InputField
                label={"Chọn khu vực chung cư"}
                icon={
                  <Ionicons
                    name="stats-chart-outline"
                    size={20}
                    color="grey"
                    style={{ marginRight: 6 }}
                  />
                }
              />
              <InputField
                label={"Chọn vị trí chung cư"}
                icon={
                  <Ionicons
                    name="home-outline"
                    size={20}
                    color="grey"
                    style={{ marginRight: 6 }}
                  />
                }
                value={apartmentInfo && apartmentInfo.name}
                onChangeText={onSearchingApartmentHandler}
              />

              {isApartmentSearching && (
                <View style={styles.dropdownContainer}>
                  {searchingApartment.length ? (
                    searchingApartment.map((item) => renderSearching(item))
                  ) : (
                    <View style={styles.dropdownNoneItem}>
                      <Text style={styles.dropdownNoneText}>
                        Không có địa chỉ nào trùng khớp
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {apartmentInfo && (
                <View style={styles.searchedContent}>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Code: </Text>
                    {apartmentInfo.code}
                  </Text>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Tên chung cư: </Text>
                    {apartmentInfo.name}
                  </Text>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
                    {apartmentInfo.address}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.locationContainer}>
              <View style={{ marginBottom: 8 }}>
                <HeaderContent>Chọn trạm nhận hàng</HeaderContent>
              </View>
              <InputField
                label={"Chọn trạm nhận hàng"}
                icon={
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color="grey"
                    style={{ marginRight: 6 }}
                  />
                }
                value={stationInfo && stationInfo.name}
                onChangeText={onSearchingStationHandler}
              />
              {/*
              <Searchbar
                placeholder="Chọn trạm nhận hàng (station)"
                elevation={3}
                theme={DefaultTheme.searchbar}
                icon={() => (
                  <Ionicons
                    name="location"
                    color={Colors.primaryGreen900}
                    size={24}
                  />
                )}
                onChangeText={onSearchingStationHandler}
              /> */}
              {isStationSearching && (
                <View style={styles.dropdownContainer}>
                  {searchingStation.length ? (
                    searchingStation.map((item) => renderSearching(item))
                  ) : (
                    <View style={styles.dropdownNoneItem}>
                      <Text style={styles.dropdownNoneText}>
                        Không có địa chỉ nào trùng khớp
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {stationInfo && (
                <View style={styles.searchedContent}>
                  <Image
                    source={{ uri: stationInfo.image }}
                    style={{
                      width: 350,
                      height: 300,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Code: </Text>
                    {stationInfo.code}
                  </Text>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Tên trạm nhận hàng:{" "}
                    </Text>
                    {stationInfo.name}
                  </Text>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Mô tả: </Text>
                    {stationInfo.description}
                  </Text>
                  <Text style={styles.dropdownText}>
                    <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
                    {stationInfo.address}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <Checkbox
                  status={isDefault ? "checked" : "unchecked"}
                  onPress={() => setIsDefault(!isDefault)}
                  color={Colors.primaryGreen700}
                />
              </View>
              <Title color={Colors.primaryGreen700}>
                Đặt làm địa chỉ mặc định?
              </Title>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <View style={[DefaultTheme.btnView, { marginRight: 4 }]}>
              <MainButton
                onPress={props.onCancel}
                styleButton={{ backgroundColor: "grey" }}
              >
                Huỷ bỏ
              </MainButton>
            </View>
            <View style={[DefaultTheme.btnView, { marginLeft: 8 }]}>
              <MainButton
                onPress={() =>
                  props.onPress(apartmentInfo, stationInfo, isDefault)
                }
              >
                Lưu
              </MainButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default LocationOptions;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginBottom: 4,
    // borderRadius: 20,
    // borderColor: "green",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginTop: 60,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#EEEEEE",
  },
  dropdownSearching: {
    backgroundColor: "white",
    padding: 14,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  dropdownContainer: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dropdownItem: {
    height: 50,
    justifyContent: "center",
  },
  dropdownText: {
    color: Colors.primaryGreen800,
    fontWeight: "500",
  },
  dropdownNoneItem: {
    alignSelf: "center",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
  dropdownNoneText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  searchedContent: {
    width: "100%",
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.primaryGreen50,
    borderRadius: 12,
  },
  txtInputContainer: {
    backgroundColor: DefaultTheme.btnBgColor800,
  },
  txtInput: {
    color: DefaultTheme.btnColor700,
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    padding: 2,
    marginRight: 2,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: Colors.primaryGreen700,
    transform: [
      {
        scale: 0.6,
      },
    ],
  },
  btnContainer: {
    flexDirection: "row",
    marginHorizontal: 32,
    marginTop: 0,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
