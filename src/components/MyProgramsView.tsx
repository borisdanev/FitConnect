import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  setOpenedSignupForm,
  setOpenedCreateProgramForm,
} from "../store";
import Button from "@mui/material/Button";
import CreateWorkoutForm from "./CreateWorkoutForm";
const MyProgramsView: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const openedCreateProgramForm = useSelector(
    (state: RootState) => state.form.openedCreateProgramForm
  );
  const handleClick = () => {
    if (currentUser.id) dispatch(setOpenedCreateProgramForm(true));
    else dispatch(setOpenedSignupForm(true));
  };
  return (
    <>
      <Button onClick={handleClick} variant="contained">
        Create Program
      </Button>
      {openedCreateProgramForm && <CreateWorkoutForm />}
    </>
  );
};
export default MyProgramsView;
