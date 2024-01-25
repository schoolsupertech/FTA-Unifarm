import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { Color } from "../constants/colors";

function Ellipsis({ description, numberOfLines }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNumberOfLines = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View>
      <Text
        variant="bodyMedium"
        numberOfLines={isCollapsed ? numberOfLines : null}
        style={{ marginBottom: 5 }}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={toggleNumberOfLines}>
        <Text style={{ color: Color.primaryGreen700 }}>
          {isCollapsed ? "Đọc tiếp" : "Thu gọn"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Ellipsis;
