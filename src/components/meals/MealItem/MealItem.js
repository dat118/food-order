import classes from "./MealItem.module.css";
import React,{useContext} from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const ctx = useContext(CartContext);
  
  const addToCartHandler = (amount) =>{
    ctx.addItem({
      name:props.name,  
      id:props.id,
      amount:amount,
      price: props.price
    });

  }
    return(
  <li className={classes.meal}>
    <div>
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>${props.price}</div>
    </div>
    <div>
        <MealItemForm id ={props.id} onAddToCart = {addToCartHandler}/>
    </div>
  </li>)
};

export default MealItem;
