import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Divider, Text as PaperText } from "react-native-paper";

import HeaderContent from "../../common/HeaderContent";
import Title from "../../common/text/Title";
import Ellipsis from "../../common/text/Ellipsis";
import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";
import { AuthContext } from "../../../context/AuthContext";

const FORMAT = createFormatUtil();

function CardHeaderInfo({ navigation, location }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <Card style={styles.cardContainer}>
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
            <Title color="grey">Người nhận: </Title>
            <PaperText variant="bodyMedium" style={styles.info}>
              {userInfo?.info?.lastName} {userInfo?.info?.firstName} -{" "}
              {userInfo?.info?.phoneNumber}
            </PaperText>
          </View>
          <Divider />
          <View style={{ marginBottom: 4 }}>
            <Title color="grey">Trạm lấy hàng: </Title>
            <Ellipsis
              description={location?.station?.address}
              numberOfLines={1}
            />
          </View>
          <Divider />
          <Title color="grey">
            Dự kiến nhận:{" "}
            <PaperText variant="titleSmall" style={styles.info}>
              {FORMAT.dateFormat(new Date())}
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
    marginBottom: 8,
  },
  cardContent: {
    paddingVertical: 8,
  },
  cardContentDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 4,
  },
  info: {
    color: Colors.primaryGreen600,
  },
  headerContent: {
    // padding: 0,
    // margin: 0,
  },
});
