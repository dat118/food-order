import { useState, useRef } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";
import axios from "axios";
const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, hasError, sentRequest } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const dataHandler = (data) => {
    console.log(data);
    dispatch(authAction.loginHandler({ token: data.idToken }));
    if (data.idToken) {
      history.push("/");
    } else {
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation

    if (!isLogin) {
      var url =
        // "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTMwvpbLj5mUGfhKlwBs6K_uADWBSxRUM";
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/resister";
    } else {
      url =
        // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTMwvpbLj5mUGfhKlwBs6K_uADWBSxRUM";
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/auth/login";
    }

    const requestConfig = {
      url: url,
      method: "POST",
      body: {
        email: enteredEmail,
        password: enteredPassword,
      },
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    // sentRequest(requestConfig, dataHandler);
    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((data) => {
        dataHandler(data);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {isLoading && <p>LOADING</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
