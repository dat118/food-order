import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmty = (value) => value.trim() === "";

const isNotFiveChar = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [isFormValid, setIsFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredStreet = inputStreetRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    setIsFormValid({
      name: !isEmty(enteredName),
      street: !isEmty(enteredStreet),
      postal: !isNotFiveChar(enteredPostal),
      city: !isEmty(enteredCity),
    });

    if (
      isFormValid.name &
      isFormValid.street &
      isFormValid.postal &
      isFormValid.city
    ) {
      props.onConfirm({
<<<<<<< HEAD
        userId: localStorage.getItem("userId"),
=======
>>>>>>> b95a82789ba9e9100cba24f564a8070932d2abc3
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div
        className={`${classes.control} ${
          !isFormValid.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} required></input>
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.street ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} required></input>
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.postal ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal code ( 5 digits )</label>
        <input type="text" id="postal" ref={inputPostalRef} required></input>
      </div>
      <div
        className={`${classes.control} ${
          !isFormValid.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} required></input>
      </div>
      <div className={classes.actions}>
        <button onClick={props.cancelOrderConfirm} className={classes["button--alt"]} type="button">
          Cancel
        </button>
        <button className={classes.button} type="submit">Comfirm</button>
      </div>
    </form>
  );
};

export default Checkout;
