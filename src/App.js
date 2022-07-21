import HomePage from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import CartProvider from "./store/CartProvider";
import { Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import { useState } from "react";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function App() {
  const [isShow, setIsShow] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  function closeHandler() {
    setIsShow(false);
  }
  function openCartHandler() {
    setIsShow(true);
  }
  return (
    <CartProvider>
      <Header openCartHandler={openCartHandler} />
      <Switch>
        <Route path="/" exact>
          <HomePage />
          {isShow && (
            <Cart
              closeHandler={closeHandler}
              openCartHandler={openCartHandler}
            />
          )}
        </Route>
        <Route path="/auth">
          {isLogin && <Redirect to="/" />}
          {!isLogin && <AuthPage />}
        </Route>
        <Route path="/profile">
          {isLogin && <ProfilePage />}
          {!isLogin && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </CartProvider>
  );
}

export default App;
