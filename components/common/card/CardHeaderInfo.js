import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text as PaperText } from "react-native-paper";

import HeaderContent from "../../common/HeaderContent";
import Title from "../../common/text/Title";
import GrayLine from "../../common/text/GrayLine";
import Ellipsis from "../../common/text/Ellipsis";
import { Colors } from "../../../constants/colors";
import { AuthContext } from "../../../context/AuthContext";
import { DefaultTheme } from "../../../themes/DefaultTheme";

function CardHeaderInfo() {
  const { userInfo } = useContext(AuthContext);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardContent}>
        <HeaderContent onPress={() => {}} label={"Thay đổi"} icon={true}>
          Thông tin nhận hàng
        </HeaderContent>
        <GrayLine />
        <View style={styles.headerContent}>
          <Title color={Colors.primaryGreen800}>Người nhận hàng:</Title>
          <View style={styles.cardContentDetail}>
            <PaperText variant="titleSmall">
              {userInfo?.lastName} {userInfo?.firstName} -{" "}
              {userInfo?.phoneNumber}
            </PaperText>
          </View>
          <GrayLine />
          <Title color={Colors.primaryGreen800}>Nhận hàng tại Station:</Title>
          <View style={styles.cardContentDetail}>
            <Ellipsis
              description={
                "Trạm nhận hàng số A-01, hầm 01, toà A, Chung cư Vinhomes Royal, Khu nhà giày, Phường Long Thạn Mỹ, Quận Thủ Đức, Thành phố Hồ Chí Minh."
              }
              numberOfLines={1}
            />
          </View>
          <GrayLine />
          <Title color={Colors.primaryGreen800}>
            Thời gian nhận:{" "}
            <PaperText variant="titleSmall" style={{ color: "black" }}>
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
    backgroundColor: DefaultTheme.cardBgColor,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  cardContent: {
    marginVertical: 0,
    paddingVertical: 16,
  },
  cardContentDetail: {
    paddingHorizontal: 20,
  },
  headerContent: {
    marginHorizontal: 20,
  },
});
