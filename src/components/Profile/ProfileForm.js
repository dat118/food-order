import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, hasError, sentRequest } = useHttp();
  const dataHandler = (data) => {
    console.log(data);
  };
  const passwordInputRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    // add validation

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyASNrQ73Kihy_9dObN59Kyh-3ats4dn46w";

    const requestConfig = {
      url: url,
      method: "POST",
      body: {
        idToken: token,
        password: enteredPassword,
        returnSecureToken: false,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    sentRequest(requestConfig, dataHandler);
    dispatch(authAction.logoutHandler())
    history.push("/");
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          minLength="6"
          id="new-password"
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
