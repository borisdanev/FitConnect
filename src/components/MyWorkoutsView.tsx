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
              <img src={WorkoutIllustration} style={{ maxWidth: "20rem" }} />
              <Typography className="h2">No Workouts Yet</Typography>
            </Box>
          )}
          <Typography className="h2" color="hsl(153, 9%, 80%)">
            Find More Workouts
          </Typography>
          <SuggestedWorkouts />
        </Grid>
        <Grid item xs={3}>
          <Notifications />
        </Grid>
      </Grid>
    </>
  );
};
export default MyWorkoutsView;
