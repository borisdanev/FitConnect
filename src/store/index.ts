import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  firebaseApi,
  useGetWorkoutsQuery,
  useCreateUserMutation,
  useGetEmailsQuery,
  useGetUserQuery,
  useGetUserWorkoutsQuery,
  useGetJoinedWorkoutQuery,
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
  finishTrainingSession,
} from "./slices/activeWorkoutSlice";
import {
  setOpenedSignupForm,
  setOpenedLoginForm,
  setOpenedCreateProgramForm,
} from "./slices/formSlice";
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
  useGetJoinedWorkoutQuery,
  setWorkout,
  useGetExercisesQuery,
  setOpenedSignupForm,
  setOpenedLoginForm,
  setOpenedCreateProgramForm,
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
  finishTrainingSession,
};
export default store;
