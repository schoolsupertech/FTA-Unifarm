import React from "react";
import { IconButton } from "react-native-paper";
import { Color } from "../../../constants/colors";

function CartBtn({ onCartAdded, onPress }) {
  return (
    <IconButton
      icon={onCartAdded ? "cart" : "cart-plus"}
      mode={onCartAdded ? "contained" : "outlined"}
      iconColor={Color.brandingSuccess500}
      containerColor={Color.primaryGreen100}
      theme={{ colors: { outline: Color.brandingSuccess500 } }}
      onPress={onPress}
    />
  );
}

export default CartBtn;
