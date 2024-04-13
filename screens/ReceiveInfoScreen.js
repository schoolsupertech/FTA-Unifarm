import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import GroupOrderItems from "../components/common/GroupOrderItems";
import { Colors } from "../constants/colors";

function ReceiveInfoScreen({ route }) {
  const paidItem = route.params.paidItem;
  const navigation = useNavigation();

  console.log("Paid item: " + JSON.stringify(paidItem, null, 2));

  return (
    <View style={styles.container}>
      <Text>Successfully paid</Text>
      <GroupOrderItems order={paidItem} />
      <TouchableOpacity
        style={{
          marginTop: 8,
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "center",
          borderBottomWidth: 0.5,
          borderColor: Colors.primaryGreen700,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.primaryGreen700,
          }}
        >
          Quay lại trang chủ
        </Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={Colors.primaryGreen700}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ReceiveInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
