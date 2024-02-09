import { createSlice } from "@reduxjs/toolkit";
import { WorkoutModel } from "../../types/workout.model";
import { PayloadAction } from "@reduxjs/toolkit";
import { WorkoutType } from "../../enums/WorkoutType";
interface State {
  value: WorkoutModel;
}
const initialState: State = {
  value: {
    title: "",
    description: "",
    creator: "",
    rating: 0,
    participants: 0,
    rates: 0,
    type: WorkoutType.All,
    timesPerWeek: 0,
    trainingSessions: [
      {
        name: "",
        exercises: [],
      },
    ],
    membersChat: [],
    id: "",
  },
};
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
