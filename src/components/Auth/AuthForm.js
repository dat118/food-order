import { useState, useRef } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios";
=======
import  axios  from "axios";
>>>>>>> 52fe51930e5bac593bbd4618bd8839abda4050b3
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
<<<<<<< HEAD
        // "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTMwvpbLj5mUGfhKlwBs6K_uADWBSxRUM";
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/resister";
    } else {
      url =
        // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTMwvpbLj5mUGfhKlwBs6K_uADWBSxRUM";
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/auth/login";
=======
        "http://127.0.0.1:8000/auth/login/auth/register";
    } else {
      url =
        "http://127.0.0.1:8000/auth/login";
>>>>>>> 52fe51930e5bac593bbd4618bd8839abda4050b3
    }
    const body = new FormData;
    body.set('email', enteredEmail);
    body.set('password', enteredPassword);
    fetch(url, {
      method: 'POST',
      body
    })
    .then(response => {
      dataHandler(response)
    })
    .catch(err => {

<<<<<<< HEAD
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
=======
    });
>>>>>>> 52fe51930e5bac593bbd4618bd8839abda4050b3
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
