import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Text as PaperText } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import Modal from "react-native-modal";

import { Colors } from "../../../constants/colors";

function TrackingOrderModal({ data, isVisible, onVisible }) {
  const titles = data.data?.map((item) => item.title);

  console.log("Tracking order data: " + JSON.stringify(data, null, 2));

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onVisible}
      style={styles.modalContainer}
    >
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <PaperText variant="headlineLarge">Thông tin đặt hàng</PaperText>
        </View>
        <StepIndicator
          stepCount={data.currentPosition}
          customStyles={styles.stepIndicator}
          currentPosition={data.currentPosition}
          labels={titles}
          direction="vertical"
        />
      </View>
    </Modal>
  );
}

export default TrackingOrderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 40,
  },
  headerContent: {
    marginTop: 20,
  },
  stepIndicator: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.primaryGreen700,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.primaryGreen700,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: Colors.primaryGreen700,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: Colors.primaryGreen700,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.primaryGreen700,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: Colors.primaryGreen700,
  },
});
