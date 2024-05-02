import React from "react";
import { View, Text, StyleSheet } from "react-native";

function LegendTransfers({ style, percent, label, dotColor }) {
  const renderDot = (color) => {
    return <View style={[styles.dot, { backgroundColor: color }]} />;
  };

  return (
    <View style={[styles.row, style]}>
      {renderDot(dotColor)}
      <Text style={{ color: "white" }}>
        {label}: {percent} %
      </Text>
    </View>
  );
}

export default LegendTransfers;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
