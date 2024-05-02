import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Banner, Divider, Text as PaperText } from "react-native-paper";

import HeaderContent from "../../common/HeaderContent";
import Title from "../../common/text/Title";
import Ellipsis from "../../common/text/Ellipsis";
import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";
import { AuthContext } from "../../../context/AuthContext";

const FORMAT = createFormatUtil();

function CardHeaderInfo({ visible, navigation }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: "Thay đổi địa chỉ",
          onPress: () => navigation.navigate("AddressScreen"),
        },
        {
          label: "Nạp tiền",
          onPress: () => navigation.navigate("Wallet"),
        },
      ]}
      theme={{
        colors: {
          primary: Colors.primaryGreen700,
          accent: Colors.primaryGreen50,
          surface: Colors.primaryGreen50,
          background: Colors.primaryGreen50,
        },
      }}
      styles={{ backgroundColor: Colors.primaryGreen50 }}
    >
      <View style={styles.headerContent}>
        <View style={styles.cardContentDetail}>
          <Title color="grey">Người nhận: </Title>
          <PaperText variant="bodyMedium" style={styles.info}>
            {userInfo?.info?.lastName} {userInfo?.info?.firstName} -{" "}
            {userInfo?.info?.phoneNumber}
          </PaperText>
        </View>
        <Divider style={{ marginVertical: 12 }} />
        <View>
          <Title color="grey">Trạm lấy hàng: </Title>
          <Ellipsis
            description={userInfo?.location?.station?.address}
            numberOfLines={1}
          />
        </View>
        <Divider style={{ marginVertical: 12 }} />
        <View style={styles.cardContentDetail}>
          <Title color="grey">Dự kiến nhận: </Title>
          <PaperText variant="titleSmall" style={styles.info}>
            {FORMAT.nextDateFormat()}
          </PaperText>
        </View>
        <Divider style={{ marginVertical: 12 }} />
        <View style={styles.cardContentDetail}>
          <Title color={Colors.primaryGreen700}>Số dư ví: </Title>
          <PaperText
            variant="titleMedium"
            style={{ fontWeight: "700", color: Colors.primaryGreen700 }}
          >
            {FORMAT.currencyFormat(userInfo?.info?.wallet.balance)}
          </PaperText>
        </View>
      </View>
    </Banner>
  );
}

export default CardHeaderInfo;

const styles = StyleSheet.create({
  cardContentDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info: {
    color: "#303030",
  },
  headerContent: {
    padding: 0,
    margin: 0,
  },
});
