import { combineReducers } from "@reduxjs/toolkit";
import { firebaseApi } from "./apis/firebaseApi";
import { viewSlice } from "./slices/viewSlice";
import { userSlice } from "./slices/userSlice";
import { workoutSlice } from "./slices/wokoutSlice";
import { formSlice } from "./slices/formSlice";
export const rootReducer = combineReducers({
  [firebaseApi.reducerPath]: firebaseApi.reducer,
  view: viewSlice.reducer,
  currentUser: userSlice.reducer,
  currentWorkout: workoutSlice.reducer,
  form: formSlice.reducer,
});
