import { combineReducers } from "@reduxjs/toolkit";
import { firebaseApi } from "./apis/firebaseApi";
import { viewSlice } from "./slices/viewSlice";
export const rootReducer = combineReducers({
  [firebaseApi.reducerPath]: firebaseApi.reducer,
  view: viewSlice.reducer,
});
