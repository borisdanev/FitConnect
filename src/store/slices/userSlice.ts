import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.model";
import { PayloadAction } from "@reduxjs/toolkit";
interface State {
  value: User;
}
const initialState: State = {
  value: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    workouts: [],
    programs: [],
    id: "",
  },
};
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
