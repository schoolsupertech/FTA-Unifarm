import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import StepIndicator from "react-native-step-indicator";

import createAxios from "../utils/AxiosUtility";
import { DefaultTheme } from "../themes/DefaultTheme";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
import LoadingIndicator from "../components/common/LoadingIndicator";

const API = createAxios();

function TrackingOrderScreen({ route }) {
  const { authState } = useContext(AuthContext);
  const orderId = route.params?.orderId;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  console.log("Order status: " + JSON.stringify(orderStatus, null, 2));

  useEffect(() => {
    const fetchOrderTracking = async () => {
      setIsLoading(true);
      const response = await API.customRequest(
        "get",
        "/order/tracking/" + orderId,
        null,
        authState?.token,
      );
      if (response.statusCode === 200) {
        setData(response.payload);
        setCurrentPosition(response.payload.length);
        fetchOrderStatusLines(response.payload);
      } else {
        console.log(
          "Oops! Something went wrong" + JSON.stringify(response, null, 2),
        );
      }
      setIsLoading(false);
    };

    fetchOrderTracking();
  }, []);

  function fetchOrderStatusLines(track) {
    if (track) {
      const orderStatusFetching = track.map((item) => item.orderStatus);
      setOrderStatus(orderStatusFetching);
    } else {
      console.log("No tracking data: " + JSON.stringify(data, null, 2));
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={DefaultTheme.root}>
        <View style={styles.container}>
          <StepIndicator
            stepCount={orderStatus.length}
            customStyles={styles.stepIndicator}
            currentPosition={currentPosition}
            labels={orderStatus}
            direction="vertical"
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default TrackingOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIndicator: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  },
});
