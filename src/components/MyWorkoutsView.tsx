import { useSelector } from "react-redux";
import { useGetUserWorkoutsQuery, RootState } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import { SortType } from "../enums/SortType";
import { WorkoutType } from "../enums/WorkoutType";
import Notifications from "./Notifications";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkoutList from "./WorkoutsList";
import SuggestedWorkouts from "./SuggestedWorkouts";
import WorkoutIllustration from "../images/workout_illustation.webp";
import EmptyState from "./EmptyState";
const MyWorkoutsView: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data, isLoading } = useGetUserWorkoutsQuery(currentUser.id);
  const screenSize = useScreenSize();
  return (
    <>
      <Grid container>
        <Grid item xs={screenSize > 1200 ? 9 : 12}>
          {data &&
          data.filter((workout) => workout.workout.creatorId !== currentUser.id)
            .length > 0 ? (
            <WorkoutList
              sortBy={SortType.Members}
              type={WorkoutType.All}
              workouts={data
                .map((workout) => workout.workout)
                .filter((workout) => workout.creatorId !== currentUser.id)}
              isLoading={isLoading}
              gridSpace={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
            />
          ) : (
            <EmptyState
              illustrationSrc={WorkoutIllustration}
              text="No Workouts Yet"
            />
          )}
          <Box sx={{ mt: 5 }}>
            <Typography className="h2 heading-color" sx={{ mb: 3 }}>
              Find{" "}
              {data &&
              data.filter(
                (workout) => workout.workout.creatorId !== currentUser.id
              ).length > 0
                ? "More"
                : ""}{" "}
              Workouts
            </Typography>
            <SuggestedWorkouts
              gridSpace={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
            />
          </Box>
        </Grid>
        {screenSize > 1200 && (
          <Grid item xs={3}>
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
            <Notifications list={data} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default MyWorkoutsView;
