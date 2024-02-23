import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useGetWorkoutProgramsQuery } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CreateProgramForm from "./CreateProgramForm";
import SuccessMessage from "./SuccessMessage";
import { IoMdCheckmark } from "react-icons/io";
import WorkoutList from "./WorkoutsList";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import ProgramIllustration from "../images/program_illustration.webp";
import CreateProgramAction from "./CreateProgramAction";
import Notifications from "./Notifications";
const MyProgramsView: React.FC = () => {
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

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          {programs && programs.length > 0 ? (
            <WorkoutList
              sortBy={SortType.members}
              type={WorkoutType.All}
              workouts={programs}
              isLoading={isLoading}
              gridSpace={4}
              programList={true}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={ProgramIllustration} />
              <Typography className="h2 heading-color">
                No Programs Yet
              </Typography>
              <CreateProgramAction width="7rem" height="7rem" />
            </Box>
          )}
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
        <Grid item xs={3} sx={{ pl: 1 }}>
          <Box
            sx={{
              bgcolor: "#00e676",
              p: 1,
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
            }}
          >
            Notifications
          </Box>
          <Notifications list={programs} />
        </Grid>
      </Grid>
    </>
  );
};
export default MyProgramsView;
