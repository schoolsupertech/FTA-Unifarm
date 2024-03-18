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
        <IconButton
          icon="information-variant"
          iconColor={Colors.primaryGreen100}
        />
        <PaperText variant="bodyMedium" style={styles.textInfo}>
          {viewData}
        </PaperText>
      </View>
      <GrayLine />
    </>
  );
}

function ProdMoreInfo({ data }) {
  return (
    <View style={styles.barContainer}>
      <LinearGradient
        start={[0, 0.1]}
        end={[1, 0.1]}
        locations={[0, 0.15]}
        colors={[Colors.primaryGreen900, Colors.primaryGreen100]}
        style={styles.linearGradient}
      >
        {data.map((dataPoint) => (
          <Bars key={dataPoint} viewData={dataPoint} />
        ))}
      </LinearGradient>
    </View>
  );
}

export default ProdMoreInfo;

const styles = StyleSheet.create({
  barContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primaryGreen900,
  },
  linearGradient: {
    padding: 4,
    borderRadius: 12,
  },
  textInfo: {
    width: "80%",
    color: Colors.primaryGreen800,
  },
  textBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
