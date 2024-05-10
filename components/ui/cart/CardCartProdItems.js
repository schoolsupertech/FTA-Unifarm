import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";

import createAxios from "../../../utils/AxiosUtility";
import createFormatUtil from "../../../utils/FormatUtility";
import { Colors } from "../../../constants/colors";
import { Checkbox } from "react-native-paper";

const API = createAxios();
const FORMAT = createFormatUtil();

let defaultCount = 1;

function CardCartProdItems(props) {
  const navigation = useNavigation();
  const maxQuantity = props.quantityInStock;
  const [count, setCount] = useState(props.quantity);
  const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  const limitQuantity = useState(5);
  const [isMaxed, setIsMaxed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsMaxed(count > limitQuantity);
  }, []);

  useEffect(() => {
    props.prodItemPrice(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    if (props.toggleCheckbox === props.id) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [props.toggleCheckbox]);

  async function fetchUpdateQuantity(updateQuantity) {
    const response = await API.customRequest(
      "put",
      "/cart/update-quantity",
      {
        orderDetailId: props.id,
        quantity: updateQuantity,
      },
      props.authState?.token,
    );
    return response;
  }

  async function addCountHandler() {
    if (count < maxQuantity) {
      const res = await fetchUpdateQuantity(count + 1);
      if (res.statusCode && res.statusCode === 200) {
        res.payload.orderDetailResponse?.map((item) => {
          if (item.id === props.id) {
            setCount(item.quantity);
            setTotalPrice(item.totalPrice);
            return props.prodItemPrice(totalPrice);
          }
        });
      } else {
        console.log(
          "Fetch error at fetchUpdateQuantity: " + JSON.stringify(res, null, 2),
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
    let countAfterMinus = count - 1;
    if (countAfterMinus >= defaultCount) {
      const res = await fetchUpdateQuantity(countAfterMinus);
      if (res.statusCode && res.statusCode === 200) {
        res.payload.orderDetailResponse.map((item) => {
          if (item.id === props.id) {
            setCount(item.quantity);
            setTotalPrice(item.totalPrice);
            return props.prodItemPrice(totalPrice);
          }
        });
      } else {
        console.log(
          "Fetch error at fetchUpdateQuantity: " + JSON.stringify(res, null, 2),
        );
      }
    } else if (countAfterMinus === 0) {
      Alert.alert(
        "Xoá khỏi giỏ hàng",
        "Bạn có chắc chắn muốn xoá sản phẩm khỏi giỏ hàng?",
        [
          { text: "Huỷ bỏ" },
          {
            text: "Xoá",
            style: "destructive",
            onPress: () => {
              const res = fetchUpdateQuantity(countAfterMinus);
              res && navigation.goBack();
              console.log("Order detail id: " + props.id + " has been deleted");
            },
          },
        ],
      );
    }
  }

  function onToggleCheckboxHandler() {
    setIsChecked(!isChecked);
    return props.onSelectedProdItem(!isChecked, props.id);
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
          <View style={styles.checkbox}>
            <Checkbox
              status={isChecked ? "checked" : "unchecked"}
              onPress={onToggleCheckboxHandler}
              color="black"
            />
          </View>
          <Image
            source={{
              uri: props.productItemResponse.imageUrl
                ? props.productItemResponse.imageUrl
                : "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              <Text style={{ color: "gray" }}>Tạm tính: </Text>
              {FORMAT.currencyFormat(totalPrice)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      {isMaxed && (
        <View>
          <Text style={{ color: "red" }}>Đã đạt số lần tối đa</Text>
        </View>
      )}
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
  checkbox: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
    transform: [
      {
        scale: 0.45,
      },
    ],
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
    fontSize: 13,
  },
});
