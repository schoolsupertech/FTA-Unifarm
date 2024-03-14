import React from "react";
import { IconButton } from "react-native-paper";
import { Colors } from "../../../constants/Colors";

function CartBtn({ onCartAdded, onPress }) {
  return (
    <IconButton
      icon={onCartAdded ? "cart" : "cart-plus"}
      mode={onCartAdded ? "contained" : "outlined"}
      iconColor={Colors.brandingSuccess500}
      containerColor={Colors.primaryGreen100}
      theme={{ colors: { outline: Colors.brandingSuccess500 } }}
      onPress={onPress}
    />
  );
}

export default CartBtn;
