import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { apiUrl } from "../../contexts/constants";

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
const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, hasError, sentRequest } = useHttp();
  const dataHandler = (data) => {
    console.log(data);
  };
  const passwordInputRef = useRef();
  const oldPasswordInputRef = useRef();
  
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const oldPassword = oldPasswordInputRef.current.value;
    // add validation

    let url = `${apiUrl}/auth/password`;

    const requestConfig = {
      url: url,
      method: "POST",
      body: {
        newPassword: enteredPassword,
        oldPassword: oldPassword,
        userId: localStorage.getItem("userId"),
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetchAndGetContent(url, 'POST', {
      'new_password': enteredPassword,
      'old_password': oldPassword,
      userId: localStorage.getItem("userId"),
    })
    .then(response => {
      dataHandler(response);
    })
    .catch((error) => {
      alert('old password incorrect');
    });
    history.push("/");
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Current Password</label>
        <input
          type="password"
          minLength="6"
          id="old-password"
          ref={oldPasswordInputRef}
        />
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
