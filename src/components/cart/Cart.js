import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import Model from "../UI/Model";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";
import { apiUrl } from "../../contexts/constants";
const Cart = (props) => {
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [isSend, setIsSend] = useState(false);
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
<<<<<<< HEAD
      url:
        // "http://127.0.0.1:8000/order",
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/order",
=======
      url: 
      // "http://127.0.0.1:8000/order",
      `${apiUrl}/order`,
>>>>>>> b95a82789ba9e9100cba24f564a8070932d2abc3
      method: "POST",
      body: {
        user: data,
        items: ctx.items,
      },
    };
    sentRequest(requestConfig, dataHandler);
    setIsSend(true);
    if (!hasError) {
      ctx.clearCart();
    }
    props.closeHandler();
  };
  const hasItem = ctx.items.length > 0;
  const orderConfirmHandler = () => {
    setOrderConfirm(true);
  };
  const cancelOrderConfirm = () => {
    setOrderConfirm(false);
  };

  const cartContent = (
    <div>
      {!orderConfirm && (
        <React.Fragment>
          <ul className={classes["cart-items"]}>{cartItem}</ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${ctx.totalAmount}</span>
          </div>
        </React.Fragment>
      )}
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
            <button className={classes.button} onClick={orderConfirmHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </div>
  );

  const cartSendingError = <p>Something went wrong!</p>;
  const cartSendingLoadind = <p>LOADING...</p>;
  const cartSendingSuccess = <p>Place order successfully</p>;
  return (
    <Model closeHandler={props.closeHandler}>
      <div className={classes.cart}>
        {hasError && cartSendingError}
        {isLoading && cartSendingLoadind}
        {!isLoading && !isSend && cartContent}
        {isSend && !hasError && cartSendingSuccess}
      </div>
    </Model>
  );
};

export default Cart;
