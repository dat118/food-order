import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const index = state.items.findIndex((item) => item.id === action.item.id);

    const addedItem = state.items[index];

    let updateItems;

    if (addedItem) {
      let updateItem = {
        ...addedItem,
        amount: addedItem.amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[index] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const index = state.items.findIndex((item) => item.id === action.id);

    const minusItem = state.items[index];

    const updateTotalAmount = state.totalAmount - minusItem.price;

    let updateItems;

    if (minusItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updateItems = state.items;

      updateItems[index].amount -= 1;
    }
    return { items: updateItems, totalAmount: updateTotalAmount };
  }
  else if(action.type === 'CLEAR'){
    return defaultCartState
  }

  
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () =>{
    dispatchCartAction({type:'CLEAR'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
