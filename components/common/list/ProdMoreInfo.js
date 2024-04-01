import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton, Text as PaperText } from "react-native-paper";

import GrayLine from "../text/GrayLine";
import { Colors } from "../../../constants/colors";

function Bars({ viewData }) {
  return (
    <>
      <View style={styles.textBar}>
        <PaperText variant="bodyMedium" style={styles.textInfo}>
          {viewData}
        </PaperText>
      </View>
    </>
  );
}

function ProdMoreInfo({ data }) {
  return (
    <View style={styles.barContainer}>

        {data.map((dataPoint) => (
          <Bars key={dataPoint} viewData={dataPoint} />
        ))}
    </View>
  );
}

export default ProdMoreInfo;

const styles = StyleSheet.create({
  barContainer: {
    borderRadius: 12,
   
  },
  linearGradient: {
    padding: 4,
    borderRadius: 12,
  },
  textInfo: {
    width: "90%",
    fontWeight: '500'
  },
  textBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
