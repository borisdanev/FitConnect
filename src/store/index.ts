import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  firebaseApi,
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetExercisesQuery,
  useJoinWorkoutMutation,
} from "./apis/firebaseApi";
import { selectView } from "./slices/viewSlice";
import { setCurrentUser } from "./slices/userSlice";
import { setWorkout } from "./slices/wokoutSlice";
import { setOpenedSignupForm, setOpenedLoginForm } from "./slices/formSlice";
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
  setOpenedSignupForm,
  setOpenedLoginForm,
  useJoinWorkoutMutation,
};
export default store;
