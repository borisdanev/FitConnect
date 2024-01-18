import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  openedSignupForm: boolean;
  openedLoginForm: boolean;
}
const initialState: State = {
  openedSignupForm: false,
  openedLoginForm: false,
};
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setOpenedSignupForm(state, action: PayloadAction<boolean>) {
      state.openedSignupForm = action.payload;
    },
    setOpenedLoginForm(state, action: PayloadAction<boolean>) {
      state.openedLoginForm = action.payload;
    },
  },
});
export const { setOpenedSignupForm, setOpenedLoginForm } = formSlice.actions;
