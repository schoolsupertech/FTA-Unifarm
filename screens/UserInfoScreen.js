import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Button,
} from "react-native";
import { Divider, Text as PaperText } from "react-native-paper";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import GridTileModal from "../components/ui/profile/GridTileModal";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/common/text/InputField";
import Title from "../components/common/text/Title";

function UserInfoScreen() {
  const { userInfo } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [modalLabel, setModalLabel] = useState("");

  function onChangingInfoHandler(label) {
    setVisible(true);
    setModalLabel(label);
  }
  function onChangingPasswordHandler() {
    setVisible(true);
    setChangingPassword(true);
  }

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <ScrollView style={[DefaultTheme.scrollContainer, { paddingTop: 8 }]}>
        <View style={styles.container}>
          <GridTileModal onPress={() => onChangingInfoHandler("Họ")} label="Họ">
            {userInfo.info.lastName}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Tên")}
            label="Tên"
          >
            {userInfo.info.firstName}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Email")}
            label="Email"
          >
            {userInfo.info.email}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Số địen thoại")}
            label="Số điện thoại"
          >
            {userInfo.info.phoneNumber}
          </GridTileModal>
          <GridTileModal
            onPress={() => onChangingInfoHandler("Địa chỉ")}
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
            onBackdropPress={() => setVisible(false)}
            style={styles.bottomModal}
          >
            <View style={styles.modalContent}>
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
                  />
                </>
              )}
              <View style={styles.modalBtn}>
                <Button
                  onPress={() => setVisible(false)}
                  title="Huỷ bỏ"
                  color="red"
                />
                <Button
                  onPress={() => setVisible(false)}
                  title="Lưu"
                  color="green"
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.footer}>
          <PaperText>Đã tham gia từ ngày {userInfo.info.createdAt}</PaperText>
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 4,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 12,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  footer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
