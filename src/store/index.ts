import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  firebaseApi,
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetUserWorkoutsQuery,
  useGetExercisesQuery,
  useJoinWorkoutMutation,
  useSetFinishedSessionMutation,
  useSetUserProfilePictureMutation,
  useGetProfilePictureQuery,
  useSendMessageMutation,
  useGetMembersChatQuery,
} from "./apis/firebaseApi";
import { selectView } from "./slices/viewSlice";
import { setCurrentUser } from "./slices/userSlice";
import { setWorkout } from "./slices/wokoutSlice";
import {
  setIsActiveWorkout,
  setVisibleOverlay,
  setFinishedExercises,
  setCurrentExerciseIndex,
  setIsFinishedTrainingSession,
} from "./slices/activeWorkoutSlice";
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
  useGetUserWorkoutsQuery,
  setWorkout,
  useGetExercisesQuery,
  setOpenedSignupForm,
  setOpenedLoginForm,
  useJoinWorkoutMutation,
  useSetFinishedSessionMutation,
  useSetUserProfilePictureMutation,
  useGetProfilePictureQuery,
  useSendMessageMutation,
  useGetMembersChatQuery,
  setIsActiveWorkout,
  setVisibleOverlay,
  setFinishedExercises,
  setCurrentExerciseIndex,
  setIsFinishedTrainingSession,
};
export default store;
