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
import { Text as PaperText, Searchbar, Checkbox, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../common/button/MainButton";
import createAxios from "../../../utils/AxiosUtility";
import { DefaultTheme } from "../../../themes/DefaultTheme";
import { Colors } from "../../../constants/colors";
import Title from "../../common/text/Title";

const API = createAxios();

function LocationOptions(props) {
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
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
          <PaperText variant="headlineMedium" style={{ fontWeight: "bold", fontSize: 20 }}>
            Cập Nhật Địa Điểm
          </PaperText>
        </View>
        <ScrollView
          style={[
            DefaultTheme.scrollContainer,
            DefaultTheme.flex_1,
            { paddingBottom: 12 },
          ]}
        >
          <View style={styles.modalView}>
            <View style={styles.location}>
              {/* <Searchbar
                placeholder="Chọn ví trí chung cư"
                theme={DefaultTheme.searchbar}
                icon={() => (
                  <Ionicons
                    name="location"
                    color={Colors.primaryGreen900}
                    size={24}
                  />
                )}
                onChangeText={onSearchingApartmentHandler}
              /> */}
              <TextInput 
                  placeholder="Chọn ví trí chung cư"
                  onChangeText={onSearchingApartmentHandler}
                  style={{
                  backgroundColor: 'white',
                  paddingLeft: 25,
                  // borderBottomWidth: 2,
                  // borderBottomColor: 'green'
                }}
                selectionColor={"green"}
                placeholderTextColor={"grey"}
                underlineColor="transparent"
              />
              <View style={{position: 'absolute', top: 15, left: 10}}>
                <Ionicons name="location" size={24} color={'green'}/>
              </View>

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
            <View style={styles.location}>
              {/* <Searchbar
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
              <TextInput 
                  placeholder="Chọn trạm nhận hàng"
                  onChangeText={onSearchingStationHandler}
                  style={{
                  backgroundColor: 'white',
                  paddingLeft: 25,
                  // borderBottomWidth: 2,
                  // borderBottomColor: 'green'
                }}
                selectionColor={"green"}
                placeholderTextColor={"grey"}
                underlineColor="transparent"
              />
              <View style={{position: 'absolute', top: 15, left: 10}}>
                <Ionicons name="location" size={24} color={'green'}/>
              </View>
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
            
            <View style={[DefaultTheme.btnView, {  marginRight: 4 }]}>
              <MainButton onPress={props.onCancel} styleButton={{backgroundColor: 'grey'}}>Huỷ bỏ</MainButton>
            </View>
            <View style={[DefaultTheme.btnView, {marginLeft: 8 }]}>
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
    marginBottom: 4,
    padding: 12,
    borderRadius: 20,
    // borderColor: "green",
    // borderWidth: 2,
    alignItems: "flex-start",
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
  location: {
    width: "100%",
    marginVertical: 12,
  },
  dropdownSearching: {
    backgroundColor: 'white',
    padding: 15,

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
    marginTop: 0,
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
    backgroundColor: 'white',
  },
  dropdownNoneText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'grey',
  },
  searchedContent: {
    width: "100%",
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
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
    marginRight: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryGreen700,
    transform: [
      {
        scale: 0.45,
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
