import React from "react";
import { View, Text, StyleSheet } from "react-native";

function LegendOrders({ value1, value2, value3, value4 }) {
  const renderDot = (color) => {
    return <View style={[styles.dot, { backgroundColor: color }]} />;
  };

  return (
    <>
      <View style={[styles.rowContainer, { marginBottom: 10 }]}>
        <View style={[styles.row, { marginRight: 20 }]}>
          {renderDot("#006DFF")}
          <Text style={{ color: "white" }}>Đã xử lý: {value1}%</Text>
        </View>
        <View style={styles.row}>
          {renderDot("#3BE9DE")}
          <Text style={{ color: "white" }}>Đã nhận: {value2}%</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.row, { marginRight: 20 }]}>
          {renderDot("#8F80F3")}
          <Text style={{ color: "white" }}>Đã nhận: {value3}%</Text>
        </View>
        <View style={styles.row}>
          {renderDot("#FF7F97")}
          <Text style={{ color: "white" }}>
            Không nhận được hàng: {value4}%
          </Text>
        </View>
      </View>
    </>
  );
}

export default LegendOrders;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  row: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
  },
});
