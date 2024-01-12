import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: { value: string } = { value: "Home" };
export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    selectView(state, action: PayloadAction<string>) {
      console.log(typeof action.payload);
      state.value = action.payload;
      // return (state.vale = action.payload);
    },
  },
});
export const { selectView } = viewSlice.actions;
