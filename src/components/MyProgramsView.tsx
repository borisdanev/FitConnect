import { useState } from "react";
import Button from "@mui/material/Button";
import CreateWorkoutForm from "./CreateWorkoutForm";
const MyProgramsView: React.FC = () => {
  const [openedForm, setOpenedForm] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpenedForm(true)} variant="contained">
        Create Program
      </Button>
      {openedForm && <CreateWorkoutForm />}
    </>
  );
};
export default MyProgramsView;
