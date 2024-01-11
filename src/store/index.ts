import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { firebaseApi } from "./apis/firebaseApi";
import { useGetWorkoutsQuery } from "./apis/firebaseApi";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }).concat([
      firebaseApi.middleware,
    ]),
});
export { useGetWorkoutsQuery };
export default store;
