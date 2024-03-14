import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../constants/Colors";

export default function FruitCardCart({ fruit }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <View style={{ marginLeft: 8 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
            marginLeft: 10,
            shadowRadius: 8,
          }}
        >
          <Image
            source={fruit.image}
            style={{
              height: 65,
              width: 65,
              shadowColor: fruit.shadow,
              overflow: "visible",
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.4,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: fruit.color(0.4),
            height: 60,
            width: 60,
            borderRadius: 20,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "black", fontWeight: "bold" }}>{fruit.name}</Text>
        <Text style={{ color: Colors.primaryGreen500, fontWeight: "900" }}>
          $ {fruit.price}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.grayScaleGray400,
            padding: 4,
            borderRadius: 12,
          }}
        >
          <Ionicons name="add-circle-outline" color="white" size={15} />
        </TouchableOpacity>
        <Text>{fruit.qty}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.grayScaleGray400,
            padding: 4,
            borderRadius: 12,
          }}
        >
          <Ionicons name="remove-circle-outline" color="white" size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
