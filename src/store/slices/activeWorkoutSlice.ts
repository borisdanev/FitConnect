import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface State {
  isActive: boolean;
  visibleOverlay: boolean;
  finishedExercises: string[];
  currentExerciseIndex: number;
}
const initialState: State = {
  isActive: false,
  visibleOverlay: true,
  finishedExercises: [],
  currentExerciseIndex: 0,
};
export const activeWorkoutSlice = createSlice({
  name: "activeWorkout",
  initialState,
  reducers: {
    setIsActiveWorkout(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setVisibleOverlay(state, action: PayloadAction<boolean>) {
      state.visibleOverlay = action.payload;
    },
    setFinishedExercises(state, action: PayloadAction<string>) {
      state.finishedExercises.push(action.payload);
    },
    setCurrentExerciseIndex(state, action: PayloadAction<number>) {
      state.currentExerciseIndex = action.payload;
    },
  },
});
export const {
  setIsActiveWorkout,
  setVisibleOverlay,
  setFinishedExercises,
  setCurrentExerciseIndex,
} = activeWorkoutSlice.actions;
