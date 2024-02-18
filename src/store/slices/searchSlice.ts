import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  keyword: string;
}
const initialState: State = {
  keyword: "",
};
export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});
export const { setSearchKeyword } = searchSlice.actions;
