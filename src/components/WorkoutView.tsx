import { useState } from "react";
import { useSelector } from "react-redux";
import useIsMember from "../hooks/useIsMember";
import useHandleNewWeek from "../hooks/useHandleNewWeek";
import {
  RootState,
  useGetUserQuery,
  useGetStoragePictureQuery,
  useUpdateWeekProgressMutation,
} from "../store";
import { TrainingSessionModel } from "../types/trainingSession.model";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutRating from "./WorkoutRating";
import TrainingSessionList from "./TrainingSessionList";
import MembersChat from "./MembersChat";
import MembershipBenefits from "./MembershipBenefits";
import JoinButton from "./JoinButton ";
import StartWorkoutButton from "./StartWorkoutButton";
import ActiveWorkout from "./ActiveWorkout";
import WorkoutProgress from "./WorkoutProgress";
import useIsWorkoutCreator from "../hooks/useIsWorkoutCreator";
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
  const { data: user } = useGetUserQuery(currentUser.email);
  const { data: workoutSrc } = useGetStoragePictureQuery(workout.id);
  const isMember = useIsMember(workout.id, user ? user.workouts : []);
  useHandleNewWeek(currentUser.id, workout.id, isMember);
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={8}>
            <WorkoutDetails
              title={workout.title}
              desc={workout.description}
              type={workout.type}
              rating={workout.rating}
              rates={workout.rates}
              members={workout.members}
              creator={workout.creator}
            />
            {isMember && workout.creatorId !== currentUser.id && (
              <WorkoutRating />
            )}
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={workoutSrc}
                style={{ maxWidth: "100%" }}
                alt="workout program cover"
              />
              {!isMember ? (
                <JoinButton workout={workout} user={user} />
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
      </Grid>
      <Grid item xs={8}>
        <Grid container columnSpacing={4}>
          <Grid item xs={5}>
            <WorkoutProgress
              timesPerWeek={workout.timesPerWeek}
              variant="current"
              currentUser={currentUser}
              currentWorkout={workout}
            />
          </Grid>
          <Grid item xs={5}>
            <WorkoutProgress
              timesPerWeek={workout.timesPerWeek}
              variant="previous"
              currentUser={currentUser}
              currentWorkout={workout}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <MembersChat isMember={isMember} />
      </Grid>
      {isActiveWorkout && (
        <ActiveWorkout trainingSession={selectedTrainingSession} />
      )}
    </Grid>
  );
};
export default WorkoutView;
