import React from "react";
import mealsReact from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth-slice";
const Header = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const logoutHandler = () => {
    dispatch(authAction.logoutHandler());
  };
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/">
          <div>MEALS</div>
        </Link>
        <nav>
          <ul>
            {!isLogin && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
            {isLogin && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLogin && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <HeaderCartButton openCartHandler={props.openCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsReact} alt="FOOD" />
      </div>
    </React.Fragment>
  );
};
export default Header;
