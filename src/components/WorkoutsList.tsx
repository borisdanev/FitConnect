import React from "react";
import Grid from "@mui/material/Grid";
import { WorkoutModel } from "../types/workout.model";
import { useGetWorkoutsQuery } from "../store";
import Workout from "./Workout";
const WorkoutList: React.FC = () => {
  const { data, isLoading, error } = useGetWorkoutsQuery();
  return (
    <Grid container spacing={0}>
      {data?.map((workout: WorkoutModel) => (
        <Grid key={workout.title} item xs={3}>
          <Workout workout={workout} />
        </Grid>
      ))}
    </Grid>
  );
};
export default WorkoutList;
