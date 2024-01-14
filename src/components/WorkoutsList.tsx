import { useState } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { WorkoutModel } from "../types/workout.model";
import { useGetWorkoutsQuery } from "../store";
import Workout from "./Workout";
import Filters from "./Filters";
const WorkoutList: React.FC = () => {
  const { data, isLoading, error } = useGetWorkoutsQuery();
  const [type, setType] = useState<string>(WorkoutType.All);
  return (
    <Box>
      <Filters type={type} setType={setType} />
      <Grid container rowSpacing={3}>
        {data
          ?.filter(
            (workout) => workout.type === type || type === WorkoutType.All
          )
          .map((workout: WorkoutModel, i) => (
            <Grid key={i} item xs={3}>
              <Workout workout={workout} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
export default WorkoutList;
