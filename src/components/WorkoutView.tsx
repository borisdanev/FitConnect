import { useSelector } from "react-redux";
import useIsMember from "../hooks/useIsMember";
import { RootState, useGetUserQuery } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WorkoutDetails from "./WorkoutDetails";
import TrainingSessionList from "./TrainingSessionList";
import MembersChat from "./MembersChat";
import MembershipBenefits from "./MembershipBenefits";
import JoinButton from "./JoinButton ";
import StartWorkoutButton from "./StartWorkoutButton";
const WorkoutView: React.FC = () => {
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
                src={workout.imgUrl}
                style={{ maxWidth: "100%" }}
                alt="workout program cover"
              />
              {!isMember ? (
                <JoinButton refetch={refetch} workout={workout} user={user} />
              ) : (
                <StartWorkoutButton />
              )}
              <MembershipBenefits timesPerWeek={workout.timesPerWeek} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <TrainingSessionList
          trainingSessions={workout.trainingSessions}
          isMember={isMember}
        />
        <MembersChat isMember={isMember} />
      </Grid>
    </Grid>
  );
};
export default WorkoutView;
