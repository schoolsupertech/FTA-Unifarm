import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import moment from "moment";
import vi from "moment/locale/vi";

import Date from "./Date";
import Title from "../text/Title";
import { Colors } from "../../../constants/colors";

function Calendar({ onSelectDate, selected }) {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();

  function getDates() {
    const _dates = [];
    for (let i = 0; i < 5; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  }

  function getCurrentMonth() {
    const month = moment(dates[0])
      .add(scrollPosition / 60, "days")
      .locale("vi", vi)
      .format("MMMM")
      .toUpperCase();
    setCurrentMonth(month);
  }

  useEffect(() => {
    getDates();
    getCurrentMonth();
  }, [scrollPosition]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title color="darkgreen">{currentMonth}</Title>
        </View>
        <View style={styles.scrollView}>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    marginTop: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(220, 255, 220, 0.75)",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.primaryGreen800,
  },
  scrollView: {
    height: 90,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryGreen50,
    borderRadius: 8,
  },
  dateSection: {
    width: "100%",
    padding: 20,
  },
});
