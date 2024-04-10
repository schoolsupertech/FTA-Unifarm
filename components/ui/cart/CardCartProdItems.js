import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import createAxios from "../../../utils/AxiosUtility";
import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";

const API = createAxios();
const FORMAT = createFormatUtil();

let defaultCount = 1;
let maxQuantity = 10;

function CardCartProdItems(props) {
  const [count, setCount] = useState(props.quantity);
  // const maxQuantity = useState(10);

  async function fetchAddToCart(count) {
    const response = await API.customRequest(
      "post",
      "/cart/upsert-to-cart",
      {
        farmHubId: props.productItemResponse.farmHubId,
        stationId: props.stationId,
        businessDayId: "814982CA-2092-4F0D-9720-83F064237A90",
        productItemId: props.productItemResponse.id,
        quantity: count,
        isAddToCart: false,
      },
      props.authState?.token,
    );
    return response;
  }

  async function addCountHandler() {
    if (count < maxQuantity) {
      const res = await fetchAddToCart(count + 1);
      if (res.statusCode && res.statusCode === 200) {
        res.payload.orderDetailResponse.map((item) => setCount(item.quantity));
      } else {
        console.log(
          "Fetch error at fetchAddToCart: " + JSON.stringify(res, null, 2),
        );
      }
    } else {
      Alert.alert(
        "Đã đạt số lượng tối đa",
        "Mai ghé mua lại sản phẩm này nhé!",
        [{ text: "Dạ vâng" }],
      );
    }
  }

  async function minusCountHandler() {
    if (count > defaultCount) {
      const res = await fetchAddToCart(count - 1);
      if (res.statusCode && res.statusCode === 200) {
        res.payload.orderDetailResponse.map((item) => setCount(item.quantity));
      } else {
        console.log(
          "Fetch error at fetchAddToCart: " + JSON.stringify(res, null, 2),
        );
      }
    }
  }

  return (
    <View style={styles.rowFront}>
      <TouchableHighlight style={styles.rowFrontVisible}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              // source={{uri: itemData.item.productImages.find((image) => {
              //   return image.displayIndex === 1;
              // }).imageUrl,
              uri: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.image}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title} numberOfLines={1}>
              {props.productItemResponse.title}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {FORMAT.currencyFormat(props.unitPrice)} /{" "}
              {props.productItemResponse.unit}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.selectingQuantity}>
              <TouchableOpacity
                onPress={minusCountHandler}
                style={styles.selectingBtn}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={20}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
              <Text style={styles.quantity}>{count}</Text>
              <TouchableOpacity
                onPress={addCountHandler}
                style={styles.selectingBtn}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={Colors.primaryGreen700}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.quantity}>
              <Text style={{ fontSize: 14, color: "gray" }}>Tạm tính: </Text>
              {FORMAT.currencyFormat(props.totalPrice)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default CardCartProdItems;

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    height: 80,
    margin: 4,
    marginBottom: 4,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
  selectingBtn: {
    marginHorizontal: 4,
  },
  selectingQuantity: {
    height: 30,
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  quantity: {
    color: Colors.primaryGreen700,
    fontWeight: "700",
    fontSize: 18,
  },
});
