import { useSelector, useDispatch } from "react-redux";
import useIsMember from "../hooks/useIsMember";
import {
  RootState,
  setOpenedSignupForm,
  useJoinWorkoutMutation,
  useGetUserQuery,
  setCurrentUser,
} from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RatingStars from "./RatingStars";
import TrainingSessionList from "./TrainingSessionList";
const WorkoutView: React.FC = () => {
  const dispatch = useDispatch();
  const workout = useSelector(
    (state: RootState) => state.currentWorkout.value!
  );
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value!
  );
  const { data: user, refetch } = useGetUserQuery(currentUser.email);
  const isMember = useIsMember(workout.id, currentUser.workouts);
  const [joinWorkout] = useJoinWorkoutMutation();
  const handleJoin = () => {
    if (currentUser) {
      joinWorkout({ workout, id: currentUser.id });
      refetch();
      if (user) dispatch(setCurrentUser(user));
    } else dispatch(setOpenedSignupForm(true));
  };
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={8}>
            <Typography className="h1">{workout.title}</Typography>
            <Typography className="h4">{workout.description}</Typography>
            <RatingStars rating={workout.rating} rates={workout.rates} />
            <Typography>Created by: {workout.creator}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={workout.img_url} alt="workout program cover" />
              {!isMember && (
                <Button
                  variant="contained"
                  sx={{ width: "100%", mt: 2 }}
                  onClick={handleJoin}
                >
                  Join Now
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <TrainingSessionList
          trainingSessions={workout.training_sessions}
          userWorkouts={currentUser ? currentUser.workouts : []}
          id={workout.id}
        />
      </Grid>
    </Grid>
  );
};
export default WorkoutView;
