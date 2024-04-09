import React, { useContext } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { Divider, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import InputField from "../components/common/text/InputField";
import CardBtn from "../components/common/button/CardBtn";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/common/text/Title";

function UserInfoScreen() {
  const { userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={DefaultTheme.root}>
      <ScrollView style={[DefaultTheme.scrollContainer, { paddingTop: 8 }]}>
        <View style={styles.container}>
          <View style={styles.avtContent}>
            <Title
              icon={
                <Ionicons
                  name="person-circle"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
              }
            >
              Avatar
            </Title>
            <CardBtn onPress={() => {}}>Upload</CardBtn>
          </View>

          <Title
            icon={
              <Ionicons
                name="person"
                size={20}
                color="grey"
                style={styles.icon}
              />
            }
          >
            Họ
          </Title>
          <View style={{ marginHorizontal: 28 }}>
            <InputField
              label={"Họ"}
              maxLength={100}
              value={userInfo.info.lastName}
            />
          </View>

          <Title
            icon={
              <Ionicons
                name="person"
                size={20}
                color="grey"
                style={styles.icon}
              />
            }
          >
            Tên
          </Title>
          <View style={{ marginHorizontal: 32 }}>
            <InputField
              label={"Tên"}
              maxLength={100}
              value={userInfo.info.firstName}
            />
          </View>

          <Title
            icon={
              <Ionicons name="at" size={20} color="grey" style={styles.icon} />
            }
          >
            Email
          </Title>
          <View style={{ marginHorizontal: 28 }}>
            <InputField
              label={"Email"}
              maxLength={100}
              value={userInfo.info.email}
            />
          </View>

          <Title
            icon={
              <Ionicons
                name="call"
                size={20}
                color="grey"
                style={styles.icon}
              />
            }
          >
            Số điện thoại
          </Title>
          <View style={{ marginHorizontal: 28 }}>
            <InputField
              label={"Số điện thoại"}
              maxLength={10}
              keyboardType={"number-pad"}
              autoCapitalize="none"
              autoCorrect={false}
              value={userInfo.info.phoneNumber}
            />
          </View>

          <Title
            icon={
              <Ionicons
                name="call"
                size={20}
                color="grey"
                style={styles.icon}
              />
            }
          >
            Địa chỉ
          </Title>
          <View style={{ marginHorizontal: 28 }}>
            <InputField
              label={"Địa chỉ"}
              maxLength={10}
              keyboardType={"number-pad"}
              autoCapitalize="none"
              autoCorrect={false}
              value={userInfo.info.address}
            />
          </View>
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
  footer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
