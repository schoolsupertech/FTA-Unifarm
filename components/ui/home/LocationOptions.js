import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text as PaperText, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Title from "../../common/text/Title";
import MainButton from "../../common/button/MainButton";
import createAxios from "../../../utils/AxiosUtility";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import { Colors } from "../../../constants/colors";

const API = createAxios();

function LocationOptions(props) {
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [isApartmentSearching, setIsApartmentSearching] = useState(false);
  const [isStationSearching, setIsStationSearching] = useState(false);
  const [searchingApartment, setSearchingApartment] = useState([]);
  const [searchingStation, setSearchingStation] = useState([]);

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
      setSearchingApartment(apartmentList);
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
      setSearchingStation(stationList);
    }
  }

  function renderSearching(itemData) {
    function onSelectApartmentHandler() {
      setIsApartmentSearching(false);
      setApartmentInfo(itemData.item);
      setSearchingApartment(itemData.item.address);
      console.log(
        "Apartment address: " + JSON.stringify(itemData.item, null, 2),
      );
    }

    function onSelectStationHandler() {
      setIsStationSearching(false);
      setStationInfo(itemData.item);
      setSearchingStation(itemData.item.address);
      console.log("Station address: " + JSON.stringify(itemData.item, null, 2));
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
            {itemData.item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Modal visible={props.visible.isVisible} animationType="slide">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.title}>
            <PaperText variant="headlineMedium" style={{ fontWeight: "bold" }}>
              Cập Nhật Địa Điểm
            </PaperText>
          </View>
          <View style={styles.modalView}>
            <View style={styles.location}>
              <Searchbar
                placeholder="Chọn ví trí chung cư"
                elevation={3}
                theme={DefaultTheme.searchbar}
                icon={() => (
                  <Ionicons
                    name="location"
                    color={Colors.primaryGreen900}
                    size={24}
                  />
                )}
                value={searchingApartment}
                onChangeText={onSearchingApartmentHandler}
              />
              {isApartmentSearching && (
                <View style={styles.dropdownContainer}>
                  {searchingApartment.length ? (
                    <FlatList
                      data={searchingApartment}
                      keyExtractor={(item) => item.id}
                      renderItem={renderSearching}
                    />
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
            <View style={styles.location}>
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
                value={searchingStation}
                onChangeText={onSearchingStationHandler}
              />
              {isStationSearching && (
                <View style={styles.dropdownContainer}>
                  {searchingStation.length ? (
                    <FlatList
                      data={searchingStation}
                      keyExtractor={(item) => item.id}
                      renderItem={renderSearching}
                    />
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
                      width: 330,
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
          </View>
          <View style={styles.btnContainer}>
            <View style={[DefaultTheme.btnView, { marginRight: 4 }]}>
              <MainButton onPress={props.onPress(apartmentInfo, stationInfo)}>
                Lưu
              </MainButton>
            </View>
            <View style={[DefaultTheme.btnView, { marginLeft: 8 }]}>
              <MainButton onPress={props.onCancel}>Huỷ bỏ</MainButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

export default LocationOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 40,
    backgroundColor: DefaultTheme.bgColor,
  },
  modalView: {
    padding: 12,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    width: "100%",
    marginVertical: 12,
  },
  dropdownSearching: {
    backgroundColor: Colors.primaryGreen50,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    marginTop: 2,
  },
  dropdownItem: {
    height: 40,
    marginBottom: 4,
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
    backgroundColor: Colors.primaryGreen50,
  },
  dropdownNoneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryGreen800,
  },
  searchedContent: {
    width: "100%",
    marginTop: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.primaryGreen50,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
  txtInputContainer: {
    backgroundColor: DefaultTheme.btnBgColor800,
  },
  txtInput: {
    color: DefaultTheme.btnColor700,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
