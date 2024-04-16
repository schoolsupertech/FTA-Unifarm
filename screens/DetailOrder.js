import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import Header from "../components/Header";

function DetailOrder({ navigation, route }) {
  const detailOrder = route.params.detailOrder;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Chi tiết đơn hàng"}
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
      />
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/3d-delivery-box-parcel_78370-825.jpg?t=st=1710488199~exp=1710491799~hmac=bb0b92125aa7e596e698e42346747ab817a4d059be7720edfc2038eb86cf9900&w=826",
            }}
            style={{ height: 180, width: 180, borderRadius: 5 }}
            resizeMode="cover"
          />
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18, color: "grey" }}>
              Mã đơn hàng
            </Text>
            <Text
              style={{ fontWeight: "500", fontSize: 18, width: "50%" }}
              numberOfLines={1}
            >
              {detailOrder.code}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18, color: "grey" }}>
              Tên người nhận
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {detailOrder.customerResponse.firstName}{" "}
              {detailOrder.customerResponse.lastName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18, color: "grey" }}>
              Tổng giá tiền
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {detailOrder.totalAmount} đ
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18, color: "grey" }}>
              Địa chỉ
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 18,
                width: "70%",
                textAlign: "right",
              }}
            >
              {detailOrder.shipAddress}
            </Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "700", fontSize: 18 }}>
            Danh sách sản phẩm
          </Text>
          {detailOrder.orderDetailResponse.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={{
                backgroundColor: "white",
                padding: 10,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 5,
                borderRadius: 10,
                elevation: 2,
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "transparent",
              }}
            >
              <Image
                source={{
                  uri:
                    item.image ||
                    "https://static.vecteezy.com/system/resources/previews/022/984/730/non_2x/vegetable-transparent-free-png.png",
                }}
                style={{ height: 80, width: 80, borderRadius: 5 }}
                resizeMode="cover"
              />
              <View
                style={{
                  marginLeft: 10,
                  borderWidth: 0,
                  borderColor: "red",
                  flex: 1,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {item.title}
                </Text>
                <Text style={{ marginTop: 5, fontSize: 16 }}>
                  Đơn giá: {item.unitPrice}
                </Text>
                <Text style={{ marginTop: 5, fontSize: 16 }}>
                  Giá: {item.totalPrice} đ
                </Text>
                <Text style={{ alignSelf: "flex-end", fontWeight: "700" }}>
                  x{item.quantity}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
