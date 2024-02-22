import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  setOpenedSignupForm,
  setOpenedCreateProgramForm,
  useGetWorkoutProgramsQuery,
} from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CreateProgramForm from "./CreateProgramForm";
import SuccessMessage from "./SuccessMessage";
import { IoMdCheckmark } from "react-icons/io";
import WorkoutList from "./WorkoutsList";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import { IoMdAdd } from "react-icons/io";
const MyProgramsView: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data: programs, isLoading } = useGetWorkoutProgramsQuery(
    currentUser.id
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
      <Grid container>
        <Grid item xs={9}>
          <WorkoutList
            sortBy={SortType.members}
            type={WorkoutType.All}
            workouts={programs}
            isLoading={isLoading}
            gridSpace={4}
          />
          {/* <Button onClick={handleClick} variant="contained">
            Create Program
          </Button> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid white",
            }}
            onClick={handleClick}
          >
            <IoMdAdd className="h3" color="white" />
          </Box>
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
        </Grid>
      </Grid>
    </>
  );
};
export default MyProgramsView;
