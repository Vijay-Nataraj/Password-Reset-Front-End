// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import loginReducer from "../feature/auth/loginSlice";
import registerReducer from "../feature/auth/registerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
  },
});

export default store;
