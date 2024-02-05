import { createSlice } from "@reduxjs/toolkit";
import { ExerciseModel } from "../../types/exercise.model";
interface Model {
  name: string;
  selectedExercises: ExerciseModel[];
  visibleExerciseSelection: boolean;
  visibleAlertMessage: boolean;
  agreeToRemove: boolean;
  removedExerciseIndex: number | undefined;
}
const initialState: Model = {
  name: "",
  selectedExercises: [],
  visibleExerciseSelection: false,
  visibleAlertMessage: false,
  agreeToRemove: false,
  removedExerciseIndex: undefined,
};
export const trainigSessionSlice = createSlice({
  name: "trainingSession",
  initialState,
  reducers: {},
});
