const initialState = {
  farmhubs: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (Array.isArray(state.farmhubs) && state.farmhubs.length > 0) {
        return {
          ...state,
          farmhubs: state.farmhubs.map((farmhub) =>
            farmhub.id === action.payload.id
              ? {
                  ...farmhub,
                  prodItems: [...farmhub.prodItems, action.payload.prodItems],
                }
              : farmhub,
          ),
        };
      } else {
        return {
          ...state,
          farmhubs: [...state.farmhubs, action.payload],
        };
      }
    case "UPDATE_CART":
      return {
        ...state,
        farmhubs: state.farmhubs.map((farmhub) =>
          farmhub.id === action.payload.farmhubId
            ? farmhub.prodItems.map(
                (item) =>
                  item.id === action.payload.prodId && {
                    ...farmhub,
                    prodItems: { ...item, qty: action.payload.qty },
                  },
              )
            : farmhub,
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        farmhubs: state.farmhubs.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        farmhubs: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
