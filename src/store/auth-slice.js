import { createSlice } from "@reduxjs/toolkit";
var idToken = localStorage.getItem("token");
// const calExpirationTime = (expirationTime) =>{
//     const currentTime = new Date().getTime();
//     const expireTime = new Date(expirationTime).getTime();
//     const remainTime = expireTime - currentTime;
//     return remainTime
// }
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: idToken,
    isLogin: idToken === null ? false : true,
  },
  reducers: {
    logoutHandler(state, actions) {
      state.token = null;
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    loginHandler(state, actions) {
      state.token = actions.payload.token;
      state.isLogin = true;
      localStorage.setItem("token", actions.payload.token);
      // const remainingTime = calExpirationTime(actions.payload.expirationTime)
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
