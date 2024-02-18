import { useSelector } from "react-redux";
import { useGetUserWorkoutsQuery, RootState } from "../store";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import Notifications from "./Notifications";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkoutList from "./WorkoutsList";
import SuggestedWorkouts from "./SuggestedWorkouts";
import WorkoutIllustration from "../images/workout_illustation.webp";
const MyWorkoutsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data, isLoading } = useGetUserWorkoutsQuery(currentUser.id);
  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          {data && data?.length > 0 ? (
            <WorkoutList
              sortBy={SortType.members}
              type={WorkoutType.All}
              workouts={data?.map((workout) => workout.workout)}
              isLoading={isLoading}
              gridSpace={4}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={WorkoutIllustration}
                draggable={false}
                style={{ maxWidth: "20rem" }}
              />
              <Typography className="h3 heading-color">
                No Workouts Yet
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 5 }}>
            <Typography className="h2 heading-color" sx={{ mb: 3 }}>
              Find {data && data.length > 0 ? "More" : ""} Workouts
            </Typography>
            <SuggestedWorkouts />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Notifications />
        </Grid>
      </Grid>
    </>
  );
};
export default MyWorkoutsView;
