import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  setOpenedSignupForm,
  setOpenedCreateProgramForm,
} from "../store";
import Button from "@mui/material/Button";
import CreateProgramForm from "./CreateProgramForm";
import SuccessMessage from "./SuccessMessage";
import { IoMdCheckmark } from "react-icons/io";
const MyProgramsView: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const openedCreateProgramForm = useSelector(
    (state: RootState) => state.form.openedCreateProgramForm
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const handleClick = () => {
    if (currentUser.id) {
      dispatch(setOpenedCreateProgramForm(true));
      return;
    }
    dispatch(setOpenedSignupForm(true));
  };
  return (
    <>
      <Button onClick={handleClick} variant="contained">
        Create Program
      </Button>
      {openedCreateProgramForm && (
        <CreateProgramForm setShowMessage={setShowMessage} />
      )}
      {showMessage && (
        <SuccessMessage
          width="20rem"
          message="Program created successfully!"
          Icon={IoMdCheckmark}
        />
      )}
    </>
  );
};
export default MyProgramsView;
