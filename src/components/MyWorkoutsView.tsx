import { useSelector } from "react-redux";
import { useGetUserWorkoutsQuery, RootState } from "../store";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import Notifications from "./Notifications";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WorkoutList from "./WorkoutsList";
import SuggestedWorkouts from "./SuggestedWorkouts";
const MyWorkoutsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data, isLoading } = useGetUserWorkoutsQuery(currentUser.id);
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <WorkoutList
            sortBy={SortType.members}
            type={WorkoutType.All}
            workouts={data?.map((workout) => workout.workout)}
            isLoading={isLoading}
          />
          <Typography className="h2" color="hsl(153, 9%, 80%)">
            Find More Workouts
          </Typography>
          <SuggestedWorkouts />
        </Grid>
        <Grid item xs={4}>
          <Notifications />
        </Grid>
      </Grid>
    </>
  );
};
export default MyWorkoutsView;
