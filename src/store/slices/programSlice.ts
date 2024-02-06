import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../types/exercise.model";
import { TrainingSessionModel } from "../../types/trainingSession.model";
interface State {
  selectedDays: number[];
  visibleExerciseSelection: boolean;
  visibleAlertMessage: boolean[];
  removedExerciseIndex: number | undefined;
  currentSessionIndex: number;
  trainingSessions: TrainingSessionModel[];
}
const initialState: State = {
  selectedDays: [],
  visibleExerciseSelection: false,
  visibleAlertMessage: Array(7).fill(false),
  removedExerciseIndex: undefined,
  currentSessionIndex: 0,
  trainingSessions: Array(7).fill({ name: "", exercises: [] }),
};
export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    addToSelectedDays(state, action: PayloadAction<number>) {
      state.selectedDays.push(action.payload);
    },
    removeFromSelectedDays(state) {
      const index = state.selectedDays.findIndex(
        (item) => item === state.currentSessionIndex
      );
      console.log(index);
      state.selectedDays.splice(index, 1);
    },
    addToTrainingSessions(state) {
      state.trainingSessions.push({
        name: "",
        exercises: [],
      });
    },
    addToSelectedExercises(state, action: PayloadAction<ExerciseModel>) {
      state.trainingSessions[state.currentSessionIndex].exercises.push(
        action.payload
      );
    },
    removeFromSelectedExercises(state, action: PayloadAction<number>) {
      state.trainingSessions[state.currentSessionIndex].exercises.splice(
        action.payload,
        1
      );
    },
    setVisibleExerciseSelection(state, action: PayloadAction<boolean>) {
      state.visibleExerciseSelection = action.payload;
    },
    setVisibleAlert(state, action: PayloadAction<boolean>) {
      state.visibleAlertMessage[state.currentSessionIndex] = action.payload;
    },

    setCurrentSessionIndex(state, action: PayloadAction<number>) {
      state.currentSessionIndex = action.payload;
    },
    setRemovedExerciseIndex(state, action: PayloadAction<number | undefined>) {
      state.removedExerciseIndex = action.payload;
    },
  },
});
export const {
  addToSelectedDays,
  removeFromSelectedDays,
  addToTrainingSessions,
  addToSelectedExercises,
  removeFromSelectedExercises,
  setVisibleExerciseSelection,
  setVisibleAlert,
  setCurrentSessionIndex,
  setRemovedExerciseIndex,
} = programSlice.actions;
