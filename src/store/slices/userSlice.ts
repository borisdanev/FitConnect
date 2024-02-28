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
    logOut() {
      return initialState;
    },
  },
});
export const { setCurrentUser, logOut } = userSlice.actions;
