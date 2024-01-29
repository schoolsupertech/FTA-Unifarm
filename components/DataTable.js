import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

function ProdMoreInfo({ data }) {
  const [isCollapsed, setIdCollapsed] = useState(true);

  return data.map((dataPoint) => (
    <TouchableOpacity
      key={dataPoint}
      style={styles.tableInfo}
      onPress={() => setIdCollapsed(!isCollapsed)}
    >
      <Text
        variant="bodyMedium"
        style={styles.textInfo}
        numberOfLines={isCollapsed ? 1 : null}
      >
        {dataPoint}
      </Text>
    </TouchableOpacity>
  ));
}

export default ProdMoreInfo;

const styles = StyleSheet.create({
  tableInfo: {
    marginBottom: 2,
    borderRadius: 2,
    borderWidth: 1,
  },
  textInfo: {
    fontWeight: "500",
  },
});
