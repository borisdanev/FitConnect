import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../types/exercise.model";
import { TrainingSessionModel } from "../../types/trainingSession.model";
interface State {
  selectedDays: string[];
  selectedExercises: ExerciseModel[];
  visibleExerciseSelection: boolean;
  visibleAlertMessage: boolean;
  agreeToRemove: boolean;
  removedExerciseIndex: number | undefined;
  trainingSessions: TrainingSessionModel[];
}
const initialState: State = {
  selectedDays: [],
  selectedExercises: [],
  visibleExerciseSelection: false,
  visibleAlertMessage: false,
  agreeToRemove: false,
  removedExerciseIndex: undefined,
  trainingSessions: [],
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
    setVisibleAlert(state, action: PayloadAction<boolean>) {
      state.visibleAlertMessage = action.payload;
    },
    setAgreeToRemove(state, action: PayloadAction<boolean>) {
      state.agreeToRemove = action.payload;
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
  setVisibleAlert,
  setAgreeToRemove,
  setRemovedExerciseIndex,
} = programSlice.actions;
