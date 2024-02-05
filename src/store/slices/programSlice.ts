import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../types/exercise.model";
import { TrainingSessionModel } from "../../types/trainingSession.model";
interface State {
  selectedDays: string[];
  visibleExerciseSelection: boolean;
  visibleAlertMessage: boolean;
  agreeToRemove: boolean;
  removedExerciseIndex: number | undefined;
  currentSessionIndex: number;
  trainingSessions: TrainingSessionModel[];
}
const initialState: State = {
  selectedDays: [],
  visibleExerciseSelection: false,
  visibleAlertMessage: false,
  agreeToRemove: false,
  removedExerciseIndex: undefined,
  currentSessionIndex: 0,
  trainingSessions: [{ name: "", exercises: [] }],
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
    removeFromSelectedExercises(
      state,
      action: PayloadAction<{ sessionIndex: number; exerciseIndex: number }>
    ) {
      const { sessionIndex, exerciseIndex } = action.payload;
      state.trainingSessions[sessionIndex].exercises.splice(exerciseIndex, 1);
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
  setAgreeToRemove,
  setCurrentSessionIndex,
  setRemovedExerciseIndex,
} = programSlice.actions;
