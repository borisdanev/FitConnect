import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface State {
  finishedExercises: string[];
  currentExerciseIndex: number;
}
const initialState: State = {
  finishedExercises: [],
  currentExerciseIndex: 0,
};
export const activeWorkoutSlice = createSlice({
  name: "activeWorkout",
  initialState,
  reducers: {
    setFinishedExercises(state, action: PayloadAction<string>) {
      state.finishedExercises.push(action.payload);
    },
    setCurrentExerciseIndex(state, action: PayloadAction<number>) {
      state.currentExerciseIndex = action.payload;
    },
  },
});
export const { setFinishedExercises, setCurrentExerciseIndex } =
  activeWorkoutSlice.actions;
