import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Divider, Text as PaperText } from "react-native-paper";

import HeaderContent from "../../common/HeaderContent";
import Title from "../../common/text/Title";
import Ellipsis from "../../common/text/Ellipsis";
import { Colors } from "../../../constants/colors";
import { AuthContext } from "../../../context/AuthContext";

function CardHeaderInfo({ navigation, location }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <Card style={styles.cardContainer} mode="contained">
      <Card.Content style={styles.cardContent}>
        <HeaderContent
          onPress={() => navigation.navigate("AddressScreen")}
          label={"Thay đổi"}
          icon={true}
        >
          Thông tin nhận hàng
        </HeaderContent>
        <View style={styles.headerContent}>
          <View style={styles.cardContentDetail}>
            <Title color={styles.info.color}>Người nhận: </Title>
            <PaperText variant="bodyMedium" style={styles.info}>
              {userInfo?.info?.lastName} {userInfo?.info?.firstName} -{" "}
              {userInfo?.info?.phoneNumber}
            </PaperText>
          </View>
          <Divider />
          <View style={{ marginBottom: 4 }}>
            <Title color={styles.info.color}>Trạm lấy hàng: </Title>
            <Ellipsis
              description={location?.station?.address}
              numberOfLines={1}
            />
          </View>
          <Divider />
          <Title color={Colors.primaryGreen800}>
            Thời gian nhận:{" "}
            <PaperText
              variant="titleSmall"
              style={{ color: Colors.primaryGreen800 }}
            >
              Từ 16h, ngày mai (20/03)
            </PaperText>
          </Title>
        </View>
      </Card.Content>
    </Card>
  );
}

export default CardHeaderInfo;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 4,
  },
  cardContent: {
    marginVertical: 0,
    paddingVertical: 8,
  },
  cardContentDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 4,
  },
  info: {
    color: "#303030",
  },
  headerContent: {
    padding: 0,
    margin: 0,
  },
});
