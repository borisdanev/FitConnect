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
  useCreateProgramMutation,
  useGetExercisesQuery,
  useJoinWorkoutMutation,
  useSetFinishedSessionMutation,
  useUpdateWeekProgressMutation,
  useUpdateUserMutation,
  useUpdateJoinedWorkoutMutation,
  useUploadImageMutation,
  useGetStoragePictureQuery,
  useSendMessageMutation,
  useGetMembersChatQuery,
  useRateWorkoutMutation,
  useAddNotificationMutation,
} from "./apis/firebaseApi";
import { selectView } from "./slices/viewSlice";
import { setCurrentUser, logOut } from "./slices/userSlice";
import { setWorkout } from "./slices/workoutSlice";
import {
  addToSelectedDays,
  removeFromSelectedDays,
  addToTrainingSessions,
  addToSelectedExercises,
  removeFromSelectedExercises,
  setVisibleExerciseSelection,
  setVisibleAlert,
  setCurrentSessionIndex,
  setRemovedExerciseIndex,
  clearForm,
} from "./slices/programSlice";
import {
  setIsActiveWorkout,
  setVisibleOverlay,
  setFinishedExercises,
  setCurrentExerciseIndex,
  setFinishedTrainingSessions,
  finishTrainingSession,
} from "./slices/activeWorkoutSlice";
import {
  setOpenedSignupForm,
  setOpenedLoginForm,
  setOpenedCreateProgramForm,
} from "./slices/formSlice";
import { setSearchKeyword, setWorkoutType } from "./slices/searchSlice";
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
  useCreateProgramMutation,
  setWorkout,
  useGetExercisesQuery,
  setOpenedSignupForm,
  setOpenedLoginForm,
  setOpenedCreateProgramForm,
  useJoinWorkoutMutation,
  useSetFinishedSessionMutation,
  useUpdateWeekProgressMutation,
  useUpdateUserMutation,
  useUpdateJoinedWorkoutMutation,
  useUploadImageMutation,
  useGetStoragePictureQuery,
  useSendMessageMutation,
  useGetMembersChatQuery,
  useRateWorkoutMutation,
  useAddNotificationMutation,
  setIsActiveWorkout,
  setVisibleOverlay,
  setFinishedExercises,
  setCurrentExerciseIndex,
  setFinishedTrainingSessions,
  finishTrainingSession,
  addToSelectedDays,
  removeFromSelectedDays,
  addToTrainingSessions,
  addToSelectedExercises,
  removeFromSelectedExercises,
  setVisibleExerciseSelection,
  setVisibleAlert,
  setCurrentSessionIndex,
  setRemovedExerciseIndex,
  clearForm,
  setSearchKeyword,
  setWorkoutType,
};
export default store;
