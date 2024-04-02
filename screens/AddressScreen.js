import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const dataAddress = [
  {
    id: 1,
    title: "Lê Anh Kiệt | 0905078138",
    description: "22C/1/2A, Tổ 7, KP3, P.10, Quận 13, TP. Hồ Chí Minh",
  },
  {
    id: 2,
    title: "Lê Anh Kiệt | 0905078138",
    description:
      "189 Đường Lê Quý Đôn, P. Thái Hòa, TP. Tân Uyên, Tỉnh Bình Dương",
  },
  {
    id: 3,
    title: "Lê Anh Kiệt | 0905078138",
    description: "Đường Võ Văn Kiệt, P. Bến Nghé, Quận 12, TP. Hồ Chí Minh",
  },
];
const AddressScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataAddress}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 30,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <View style={{ marginRight: 15 }}>
              <Ionicons name="location-outline" size={28} color={"grey"} />
            </View>
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#444444" }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "85%", marginTop: 5, color: "grey" }}>
                  {item.description}
                </Text>
                <View style={{}}>
                  <Ionicons name="create-outline" size={20} color={"grey"} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View
            style={{
              paddingVertical: 20,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color={"grey"} />
            <Text style={{ fontSize: 16, color: "grey" }}>
              {" "}
              Thêm địa chỉ mới
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
