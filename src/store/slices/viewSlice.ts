import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ViewEnum } from "../../enums/View";
interface State {
  value: ViewEnum;
}
const initialState: State = { value: ViewEnum.Home };
export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    selectView(state, action: PayloadAction<ViewEnum>) {
      state.value = action.payload;
    },
  },
});
export const { selectView } = viewSlice.actions;
