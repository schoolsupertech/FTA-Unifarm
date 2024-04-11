import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, Text as PaperText } from "react-native-paper";

import { Text } from "react-native-paper";
import { Colors } from "../../../constants/colors";

function Ellipsis({ description, data, numberOfLines }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleNumberOfLines() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <View>
      <Text
        variant="bodyMedium"
        numberOfLines={isCollapsed ? numberOfLines : null}
        style={{ marginBottom: 2 }}
      >
        {description}
        {data && data.map((viewData) => "\n" + viewData)}
      </Text>

      <TouchableOpacity onPress={toggleNumberOfLines}>
        <View style={styles.collapsedBtn}>
          <Text style={{ color: Colors.primaryGreen700 }}>
            {isCollapsed ? "Đọc tiếp" : "Thu gọn"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Ellipsis;

const styles = StyleSheet.create({
  collapsedBtn: {
    marginTop: 2,
  },
});
