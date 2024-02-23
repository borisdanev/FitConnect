import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setOpenedCreateProgramForm,
  setOpenedSignupForm,
} from "../store";
const useCreateProgram = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  return () => {
    if (currentUser.id) {
      dispatch(setOpenedCreateProgramForm(true));
      return;
    }
    dispatch(setOpenedSignupForm(true));
  };
};
export default useCreateProgram;
