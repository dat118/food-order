import { useState, useRef } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";
import  axios  from "axios";

 const fetchAndGetContent = async (url = '', method = 'GET', body = {}) => {
  if (['GET', 'HEAD'].includes(method)) {
      url = new URL(url);
      const bodyParams = new URLSearchParams(body);
      const urlParams = url.searchParams;
      const allParameters = new URLSearchParams({
          ...Object.fromEntries(bodyParams),
          ...Object.fromEntries(urlParams)
      });
      url = `${url.origin}${url.pathname}?${allParameters.toString()}`;
      const response = await fetch(url);
      return (await response.json()) || null;
  } else {
      const formData = new FormData;
      Object.keys(body).forEach(key => formData.append(key, body[key]));
      const response = await fetch(url, {
          method,
          headers: {},
          body: formData
      });
      return (await response.json()) || null;
  }
}

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, hasError, sentRequest } = useHttp();
  const logoutAuto = () => {
    dispatch(authAction.logoutHandler());
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const dataHandler = (data) => {
    console.log(data);
    dispatch(
      authAction.loginHandler({ token: data.idToken })
    );
    setTimeout(logoutAuto, data.expiresIn*1000);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation

    if (!isLogin) {
      var url =
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/auth/register";
    } else {
      url =
        "http://5f30-2001-ee0-4161-b7b2-5572-32a-263-cbe2.ngrok.io/auth/login";
    }
    fetchAndGetContent(url, 'POST', {
      email: enteredEmail,
      password: enteredPassword
    })
    .then(response => {
      dataHandler(response);
    })
    .catch(() => {

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
