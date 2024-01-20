import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.model";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  value: null | User;
}
const initialState: State = { value: null };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      console.log("setting user");
      state.value = action.payload;
    },
  },
});
export const { setCurrentUser } = userSlice.actions;