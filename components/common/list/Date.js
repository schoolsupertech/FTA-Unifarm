import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { Colors } from "../../../constants/colors";

function Date({ date, onSelectDate, selected }) {
  const day =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "Hôm nay"
      : moment(date).format("ddd");
  const dayNumber = moment(date).format("D");
  const fullDate = moment(date).format("YYYY-MM-DD");

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.container,
        selected === fullDate && { backgroundColor: Colors.primaryGreen800 },
      ]}
    >
      <Text
        style={[
          styles.day,
          day === "CN" && { color: "red" },
          selected === fullDate && { color: Colors.primaryGreen50 },
        ]}
      >
        {day}
      </Text>
      <View style={{ height: 8 }} />
      <Text
        style={[
          styles.dayNumber,
          selected === fullDate && {
            color: Colors.primaryGreen50,
            fontWeight: "600",
            fontSize: 22,
          },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
}

export default Date;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 70,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayNumber: {
    fontSize: 18,
  },
});
