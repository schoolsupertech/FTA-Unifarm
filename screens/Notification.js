import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const dataNoti = [
  {
    id: 1,
    title: "Bạn có đơn hàng đang trên đường",
    description:
      "Đơn hàng sắp được giao đến bạn, vui lòng kiểm tra điện thoại thường xuyên",
  },
  {
    id: 2,
    title: "Giao hàng thành công",
    description:
      "Đơn hàng đã giao đến bạn, vui lòng kiểm tra và đánh giá sản phẩm",
  },
  {
    id: 3,
    title: "Xác nhận đã thanh toán",
    description:
      "Thanh toán cho đơn hàng 235F35AV323 thành công. Vui lòng kiểm tra thời gian nhận hàng trong chi tiết đơn hàng.",
  },
  {
    id: 4,
    title: "Bạn có đơn hàng đang trên đường",
    description:
      "Đơn hàng sắp được giao đến bạn, vui lòng kiểm tra điện thoại thường xuyên, Đơn hàng sắp được giao đến bạn, vui lòng kiểm tra điện thoại thường xuyên",
  },
];
function NotificationScreen({ navigation, route }) {
  const data = route.params.data;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
            onPress={() => navigation.navigate("Vận chuyển")}
          >
            <View style={{ marginRight: 14 }}>
              <Ionicons name="notifications-outline" size={28} color={"grey"} />
            </View>
            <View style={{ width: "100%" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#444444" }}
              >
                {item.content}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ marginTop: 5, color: "grey" }}>
                    Mã vận chuyển: {item.code}
                  </Text>
                  <Text style={{ marginTop: 5, color: "grey" }}>
                    Trạng thái: {item.title}
                  </Text>
                </View>
                <View>
                  <Ionicons name="chevron-forward" size={28} color={"grey"} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
