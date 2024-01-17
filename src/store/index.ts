import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  firebaseApi,
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetExercisesQuery,
} from "./apis/firebaseApi";
import { selectView } from "./slices/viewSlice";
import { setCurrentUser } from "./slices/userSlice";
import { setWorkout } from "./slices/wokoutSlice";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }).concat([
      firebaseApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export {
  useGetWorkoutsQuery,
  selectView,
  useCreateUserMutation,
  setCurrentUser,
  useGetEmailsQuery,
  useGetUserQuery,
  setWorkout,
  useGetExercisesQuery,
};
export default store;
