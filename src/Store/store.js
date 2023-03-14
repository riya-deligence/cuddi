import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/UserSlice";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
