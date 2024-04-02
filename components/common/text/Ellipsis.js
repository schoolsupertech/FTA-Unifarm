import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "../../../constants/colors";

function Ellipsis({ description, numberOfLines }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleNumberOfLines() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <View>
      <Text
        variant="bodyMedium"
        numberOfLines={isCollapsed ? numberOfLines : null}
        style={{ marginBottom: 4 }}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={toggleNumberOfLines}>
        <Text style={{ color: Colors.primaryGreen700 }}>
          {isCollapsed ? "Đọc tiếp" : "Thu gọn"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Ellipsis;
