import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import Model from "../UI/Model";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";
const Cart = (props) => {
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [isSend,setIsSend] = useState (false)
  const ctx = useContext(CartContext);
  const { isLoading, hasError, sentRequest } = useHttp();
  const dataHandler = (data) => {
    console.log(data);
  };
  const cartItemAddHandler = (item) => {
    let addedItem = { ...item, amount: 1 };
    ctx.addItem(addedItem);
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItem = ctx.items.map((item) => (
    <CartItem
      name={item.name}
      price={item.price}
      amount={item.amount}
      key={item.id}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    >
      {item.name}
    </CartItem>
  ));
  const onConfirmHandler = (data) => {
    
    const requestConfig = {
      url: "https://food-order-13297-default-rtdb.firebaseio.com/order.json",
      method: "POST",
      body: {
        user: data,
        items: ctx.items,
      },
    };
    sentRequest(requestConfig, dataHandler);
    setIsSend(true)
    if(!hasError){ctx.clearCart()}
    props.closeHandler();
  };
  const hasItem = ctx.items.length > 0;
  const orderConfirmHandler = () => {
    setOrderConfirm(true);
  };
  const cancelOrderConfirm = () => {
    setOrderConfirm(false);
  };

  const cartContent = (<React.Fragment>
    <ul className={classes["cart-items"]}>{cartItem}</ul>
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>${ctx.totalAmount.toFixed(2)}</span>
    </div>
    {orderConfirm && (
      <Checkout
        cancelOrderConfirm={cancelOrderConfirm}
        onConfirm={onConfirmHandler}
      />
    )}
    {!orderConfirm && (
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.closeHandler}
        >
          Close
        </button>
        {hasItem && (
          <button
            className={classes.button}
            onClick={orderConfirmHandler}
          >
            Order
          </button>
        )}
      </div>
    )}
  </React.Fragment>)

  const cartSendingError = (<p>Something went wrong!</p>)
  const cartSendingLoadind = (<p>LOADING...</p>)
  const cartSendingSuccess = (<p>Place order successfully</p>)
  return (
    <Model closeHandler={props.closeHandler}>
      {hasError && cartSendingError}
      {isLoading &&  cartSendingLoadind}
      {!isLoading && !isSend && cartContent}
      {isSend && !hasError && cartSendingSuccess}
    </Model>
  );
};

export default Cart;
