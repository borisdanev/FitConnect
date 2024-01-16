import { createSlice } from "@reduxjs/toolkit";
import { WorkoutModel } from "../../types/workout.model";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  value: WorkoutModel | null;
}
const initialState: State = { value: null };
export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout(state, action: PayloadAction<WorkoutModel>) {
      state.value = action.payload;
    },
  },
});
export const { setWorkout } = workoutSlice.actions;
