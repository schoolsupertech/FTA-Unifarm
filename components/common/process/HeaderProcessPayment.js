import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/colors";

function HeaderprocessingPayment({ processing, processed }) {
  if (processing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
        <PaperText variant="headlineMedium" style={{ color: "gray" }}>
          Đơn hàng của bạn đang được xử lý
        </PaperText>
        <PaperText variant="headlineSmall" style={{ color: "gray" }}>
          Vui lòng chờ trong giây lát...
        </PaperText>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {processed.isSuccess ? (
          <>
            <Ionicons
              name="checkmark-circle"
              size={36}
              color={Colors.primaryGreen700}
            />
            <PaperText
              variant="headlineMedium"
              style={{ color: Colors.primaryGreen700 }}
            >
              {processed.message}
            </PaperText>
          </>
        ) : (
          <>
            <Ionicons
              name="remove-circle"
              size={36}
              color={Colors.brandingError}
            />
            <PaperText
              variant="headlineMedium"
              style={{ color: Colors.brandingError }}
            >
              {processed.message}
            </PaperText>
          </>
        )}
      </View>
    );
  }
}

export default HeaderprocessingPayment;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
