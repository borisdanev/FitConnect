import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../types/exercise.model";
interface State {
  selectedDays: string[];
  selectedExercises: ExerciseModel[];
  visibleExerciseSelection: boolean;
  removedExerciseIndex: number | undefined;
}
const initialState: State = {
  selectedDays: [],
  selectedExercises: [],
  visibleExerciseSelection: false,
  removedExerciseIndex: undefined,
};
export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    addToSelectedDays(state, action: PayloadAction<string>) {
      state.selectedDays.push(action.payload);
    },
    removeFromSelectedDays(state, action: PayloadAction<number>) {
      state.selectedDays.splice(action.payload, 1);
    },
    addToSelectedExercises(state, action: PayloadAction<ExerciseModel>) {
      state.selectedExercises.push(action.payload);
    },
    removeFromSelectedExercises(state, action: PayloadAction<number>) {
      state.selectedExercises.splice(action.payload, 1);
    },
    setVisibleExerciseSelection(state, action: PayloadAction<boolean>) {
      state.visibleExerciseSelection = action.payload;
    },
    setRemovedExerciseIndex(state, action: PayloadAction<number | undefined>) {
      state.removedExerciseIndex = action.payload;
    },
  },
});
export const {
  addToSelectedDays,
  removeFromSelectedDays,
  addToSelectedExercises,
  removeFromSelectedExercises,
  setVisibleExerciseSelection,
  setRemovedExerciseIndex,
} = programSlice.actions;
