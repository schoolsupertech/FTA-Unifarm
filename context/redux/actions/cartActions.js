export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const removeFromCart = (prodItemId) => ({
  type: "REMOVE_FROM_CART",
  payload: prodItemId,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});
