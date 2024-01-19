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
import Button from "@mui/material/Button";
import WorkoutDetails from "./WorkoutDetails";
import TrainingSessionList from "./TrainingSessionList";
import MembersChat from "./MembersChat";
import MembershipBenefits from "./MembershipBenefits";
const WorkoutView: React.FC = () => {
  const dispatch = useDispatch();
  const workout = useSelector(
    (state: RootState) => state.currentWorkout.value!
  );
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value!
  );
  const { data: user, refetch } = useGetUserQuery(
    currentUser ? currentUser.email : ""
  );
  const isMember = useIsMember(workout.id, user ? user.workouts : []);
  const [joinWorkout] = useJoinWorkoutMutation();
  const handleJoin = () => {
    if (currentUser) {
      joinWorkout({ workout, id: currentUser.id });
      refetch();
      if (user) dispatch(setCurrentUser(user));
      return;
    }
    dispatch(setOpenedSignupForm(true));
  };
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={8}>
            <WorkoutDetails
              title={workout.title}
              desc={workout.description}
              rating={workout.rating}
              rates={workout.rates}
              members={workout.participants}
              creator={workout.creator}
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={workout.img_url}
                style={{ maxWidth: "100%" }}
                alt="workout program cover"
              />
              {!isMember ? (
                <Button
                  variant="contained"
                  sx={{ width: "100%", mt: 2 }}
                  onClick={handleJoin}
                >
                  Join Now
                </Button>
              ) : (
                <Button variant="outlined" sx={{ width: "100%", mt: 2 }}>
                  Start Workout
                </Button>
              )}
              <MembershipBenefits timesPerWeek={workout.times_per_week} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <TrainingSessionList
          trainingSessions={workout.training_sessions}
          isMember={isMember}
        />
        <MembersChat isMember={isMember} />
      </Grid>
    </Grid>
  );
};
export default WorkoutView;
