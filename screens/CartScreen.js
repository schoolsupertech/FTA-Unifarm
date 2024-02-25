import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import StarRating from 'react-native-star-rating';
import FruitCardCart from "../components/fruitCardCart";
import { cartItems } from "../constants/cartItems";
import { Color } from "../constants/colors";

function CartScreen(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Color.primaryGreen50,
      }}
    >
      {/*
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginHorizontal: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ borderRadius: 12, borderWidth: 1 }}
        >
          <Ionicons name="chevron-back-circle-sharp" size={30} />
        </TouchableOpacity>
      </View>
      */}
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        {/*
        <Text style={{ color: "black", fontSize: 24, paddingVertical: 16 }}>
          Your <Text style={{ fontWeight: "bold" }}>cart</Text>
        </Text>
        */}
        <View style={{ flex: 1 }}>
          {cartItems.map((item, index) => (
            <FruitCardCart fruit={item} key={index} />
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Total price:{" "}
            <Text style={{ fontWeight: "bold", color: Color.primaryGreen500 }}>
              240.700 VNĐ
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 12,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "orange",
            opacity: 0.8,
            shadowColor: "orange",
            shadowRadius: 25,
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.4,
            padding: 4,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CartScreen;
