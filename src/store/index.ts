import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { firebaseApi, useGetWorkoutsQuery } from "./apis/firebaseApi";
import { selectView } from "./slices/viewSlice";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }).concat([
      firebaseApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export { useGetWorkoutsQuery, selectView };
export default store;
