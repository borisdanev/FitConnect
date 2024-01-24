import { useState } from "react";
import { useSelector } from "react-redux";
import useIsMember from "../hooks/useIsMember";
import { RootState, useGetUserQuery } from "../store";
import { TrainingSessionModel } from "../types/trainingSession.model";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WorkoutDetails from "./WorkoutDetails";
import TrainingSessionList from "./TrainingSessionList";
import MembersChat from "./MembersChat";
import MembershipBenefits from "./MembershipBenefits";
import JoinButton from "./JoinButton ";
import StartWorkoutButton from "./StartWorkoutButton";
import ActiveWorkout from "./ActiveWorkout";
import WorkoutProgress from "./CalendarProgress";
const WorkoutView: React.FC = () => {
  const workout = useSelector((state: RootState) => state.currentWorkout.value);
  const [selectedTrainingSession, setSelectedTrainingSession] =
    useState<TrainingSessionModel>(workout.trainingSessions[0]);
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const isActiveWorkout = useSelector(
    (state: RootState) => state.activeWorkout.isActive
  );
  const { data: user, refetch } = useGetUserQuery(currentUser.email);
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
          setSelectedTrainingSession={setSelectedTrainingSession}
        />
        <MembersChat isMember={isMember} />
      </Grid>
      <Grid item xs={8}>
        <WorkoutProgress timesPerWeek={workout.timesPerWeek} />
      </Grid>
      {isActiveWorkout && (
        <ActiveWorkout trainingSession={selectedTrainingSession} />
      )}
    </Grid>
  );
};
export default WorkoutView;
