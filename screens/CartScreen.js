import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import StarRating from 'react-native-star-rating';
import FruitCardCart from "../components/fruitCardCart";
import { cartItems } from "../constants/cartItems";
import { Color } from "../constants/colors";
import { StyleSheet } from "react-native";

function CartScreen(props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginHorizontal: 10, marginBottom: 72 }}>
        <View style={styles.headerContainer}>
          <Text style={{ color: "black", fontSize: 24, paddingVertical: 16 }}>
            Your <Text style={{ fontWeight: "bold" }}>cart</Text>
          </Text>
          <View style={{ flex: 1 }}>
            {cartItems.map((item, index) => (
              <FruitCardCart fruit={item} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingTop: 8,
          paddingHorizontal: 12,
          backgroundColor: Color.primaryGreen50,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Color.primaryGreen700,
              opacity: 0.8,
              shadowColor: "green",
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.7,
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
      </View>
    </SafeAreaView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
});
