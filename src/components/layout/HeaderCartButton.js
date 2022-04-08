import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [buttonHightLight, setButtonHightLight] = useState(false);
  const ctx = useContext(CartContext);

  const numberOfCartItem = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const buttonClass = `${classes.button} ${
    buttonHightLight ? classes.bump : ""
  }`;
  useEffect(() => {
    if (ctx.items.length === 0) return;
    setButtonHightLight(true);
    const timer = setTimeout(() => {
      setButtonHightLight(false);
    }, 300);
    return()=>{
      clearTimeout(timer)
    }
  }, [ctx.items]);
  return (
    <React.Fragment>
      <button className={buttonClass} onClick={props.openCartHandler}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
