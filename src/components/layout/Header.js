import React from "react";
import mealsReact from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link, NavLink } from "react-router-dom";
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
        {isLogin ? (
          <Link to="/" className={classes.mobileHidden}>
            <div >MEALS</div>
          </Link>
        ) : (
          <Link to="/">
            <div>MEALS</div>
          </Link>
        )}
        <nav>
          <ul>
            {!isLogin && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
            {/* {isLogin && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )} */}
            {isLogin && (
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            )}
          </ul>
        </nav>
        {isLogin ? (
          <HeaderCartButton openCartHandler={props.openCartHandler} />
        ) : (
          <Link to="/auth" className={classes.linkException}>
            <HeaderCartButton openCartHandler={props.openCartHandler} />
          </Link>
        )}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsReact} alt="FOOD" />
      </div>
    </React.Fragment>
  );
};
export default Header;
