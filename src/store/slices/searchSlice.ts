import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { WorkoutType } from "../../enums/WorkoutType";
interface State {
  keyword: string;
  type: WorkoutType;
}
const initialState: State = {
  keyword: "",
  type: WorkoutType.All,
};
export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setWorkoutType(state, action: PayloadAction<WorkoutType>) {
      state.type = action.payload;
    },
  },
});
export const { setSearchKeyword, setWorkoutType } = searchSlice.actions;
