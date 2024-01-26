import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  openedSignupForm: boolean;
  openedLoginForm: boolean;
  openedCreateProgramForm: boolean;
}
const initialState: State = {
  openedSignupForm: false,
  openedLoginForm: false,
  openedCreateProgramForm: false,
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
    setOpenedCreateProgramForm(state, action: PayloadAction<boolean>) {
      state.openedCreateProgramForm = action.payload;
    },
  },
});
export const {
  setOpenedSignupForm,
  setOpenedLoginForm,
  setOpenedCreateProgramForm,
} = formSlice.actions;
