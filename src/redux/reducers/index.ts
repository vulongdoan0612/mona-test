import { combineReducers } from "@reduxjs/toolkit";
import post from "./post";
import cart from "./cart";

const rootReducer = combineReducers({
  post,
  cart,
});

export default rootReducer;
