import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Button,
} from "react-native";
import { Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import GridTileModal from "../components/ui/profile/GridTileModal";
import InputField from "../components/common/text/InputField";
import Title from "../components/common/text/Title";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";

const initialUser = {
  email: "",
  password: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  address: "",
  role: "Customer",
};

function UserInfoScreen() {
  const [user, setUser] = useState(initialUser);
  const { userInfo, updateProfile } = useContext(AuthContext);
  const formattedDate = new Date(
    userInfo?.info?.createdAt,
  ).toLocaleDateString();
  const [visible, setVisible] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [currentInputField, setCurrentInputField] = useState("");

  function onChangingInfoHandler(label, field) {
    setVisible(true);
    setModalLabel(label);
    setCurrentInputField(field);
  }

  function onChangingPasswordHandler() {
    setVisible(true);
    setChangingPassword(true);
  }

  function inputChangingHandler(value, userField) {
    setUser({
      ...user,
      [userField]: value,
    });
  }

  async function onSavedHandler() {
    const res = await updateProfile(user);
    console.log("Response: " + JSON.stringify(res, null, 2));
    setVisible(false);
    setChangingPassword(false);
    setUser(initialUser);
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <ScrollView style={[DefaultTheme.scrollContainer, { paddingTop: 8 }]}>
        <View style={styles.container}>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Họ", "lastName")}
            label="Họ"
          >
            {userInfo.info.lastName}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Tên", "firstName")}
            label="Tên"
          >
            {userInfo.info.firstName}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Email", "email")}
            label="Email"
          >
            {userInfo.info.email}
          </GridTileModal>
          <GridTileModal
            onPress={() =>
              onChangingInfoHandler("Số địen thoại", "phoneNumber")
            }
            label="Số điện thoại"
          >
            {userInfo.info.phoneNumber}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Địa chỉ", "address")}
            label="Địa chỉ"
          >
            {userInfo.info.address}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingPasswordHandler("Mật khẩu")}
            label="Mật khẩu"
          />

          <Modal
            isVisible={visible}
            onBackdropPress={() => {
              setVisible(false);
              setChangingPassword(false);
              setUser(initialUser);
            }}
            style={DefaultTheme.bottomModal}
          >
            <View style={DefaultTheme.modalContent}>
              {changingPassword ? (
                <>
                  <View style={{ marginBottom: 20 }}>
                    <Title
                      icon={
                        <Ionicons
                          name="key"
                          size={20}
                          style={{ marginRight: 8 }}
                        />
                      }
                    >
                      Thay đổi mật khẩu
                    </Title>
                  </View>
                  <InputField
                    label="Mật khẩu hiện tại"
                    inputType="password"
                    maxLength={100}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputField
                    label="Nhập mật khẩu mới"
                    inputType="password"
                    maxLength={100}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputField
                    label="Nhập lại mật khẩu mới"
                    inputType="password"
                    maxLength={100}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </>
              ) : (
                <>
                  <View style={{ marginBottom: 20 }}>
                    <Title
                      icon={
                        <Ionicons
                          name="person-sharp"
                          size={20}
                          style={{ marginRight: 8 }}
                        />
                      }
                    >
                      Thay đổi {modalLabel.toLowerCase()}
                    </Title>
                  </View>
                  <InputField
                    label={"Nhập " + modalLabel.toLowerCase() + " của bạn"}
                    onChangeText={(value) =>
                      inputChangingHandler(value, currentInputField)
                    }
                  />
                </>
              )}
              <View style={styles.modalBtn}>
                <Button
                  onPress={() => {
                    setVisible(false);
                    setChangingPassword(false);
                    setUser(initialUser);
                  }}
                  title="Huỷ bỏ"
                  color="red"
                />
                <Button onPress={onSavedHandler} title="Lưu" color="green" />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.footer}>
          <PaperText>
            Đã tham gia từ{" "}
            <PaperText style={{ color: "red" }}>{formattedDate}</PaperText>
          </PaperText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#EEEEEE",
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
  },
  avtContent: {
    flexDirection: "row",
    paddingBottom: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 6,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 12,
  },
  footer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
