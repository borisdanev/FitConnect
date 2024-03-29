import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useGetUserWorkoutsQuery } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import useGetWorkoutPrograms from "../hooks/useGetWorkoutPrograms";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateProgramForm from "./CreateProgramForm";
import SuccessMessage from "./SuccessMessage";
import { IoMdCheckmark } from "react-icons/io";
import WorkoutList from "./WorkoutsList";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import ProgramIllustration from "../images/program_illustration.webp";
import CreateProgramAction from "./CreateProgramAction";
import Notifications from "./Notifications";
import EmptyState from "./EmptyState";
const MyProgramsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const screenSize = useScreenSize();
  const { data: workouts, isLoading } = useGetUserWorkoutsQuery(currentUser.id);
  const programs = useGetWorkoutPrograms(
    currentUser.id,
    workouts?.map((workout) => workout.workout)
  );
  const openedCreateProgramForm = useSelector(
    (state: RootState) => state.form.openedCreateProgramForm
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  return (
    <>
      <Grid container>
        <Grid item xs={screenSize > 1200 ? 9 : 12}>
          {programs && programs.length > 0 ? (
            <WorkoutList
              sortBy={SortType.Members}
              type={WorkoutType.All}
              workouts={programs}
              isLoading={isLoading}
              gridSpace={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
              programList={true}
            />
          ) : (
            <Box>
              <EmptyState
                illustrationSrc={ProgramIllustration}
                text="No Workout Programs Created Yet"
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CreateProgramAction
                  width="clamp(7rem, 20vw, 9rem)"
                  height="clamp(7rem, 20vw, 9rem)"
                  bgColor="#37423d"
                />
              </Box>
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
        {screenSize > 1200 && (
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
        )}
      </Grid>
    </>
  );
};
export default MyProgramsView;
