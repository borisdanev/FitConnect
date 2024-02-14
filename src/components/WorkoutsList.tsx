import { useState } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { WorkoutModel } from "../types/workout.model";
import { useGetWorkoutsQuery } from "../store";
import Skeleton from "@mui/material/Skeleton";
import Workout from "./Workout";
import Filters from "./Filters";
import WorkoutSorting from "./WorkoutSorting";
const WorkoutList: React.FC = () => {
  const { data, isLoading } = useGetWorkoutsQuery();
  const [type, setType] = useState<string>(WorkoutType.All);
  const [sortBy, setSortBy] = useState<string>("rating");
  return (
    <Box>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Filters type={type} setType={setType} />
        <WorkoutSorting sortBy={sortBy} setSortBy={setSortBy} />
      </Box>
      <Grid container rowSpacing={3} columnSpacing={2}>
        {isLoading
          ? Array(8)
              .fill(null)
              .map((_, i) => (
                <Grid item key={i} xs={3}>
                  <Skeleton
                    variant="rectangular"
                    width="18.5rem"
                    height="12.5rem"
                  />
                  <Skeleton
                    sx={{ mt: 1 }}
                    variant="rectangular"
                    width="14rem"
                    height="1.1rem"
                  />
                  <Skeleton
                    sx={{ my: 1 }}
                    variant="rectangular"
                    width="2rem"
                    height="0.8rem"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="14rem"
                    height="0.8rem"
                  />
                </Grid>
              ))
          : data &&
            [...data]
              .sort(
                (a, b) =>
                  (b[sortBy as keyof WorkoutModel] as number) -
                  (a[sortBy as keyof WorkoutModel] as number)
              )
              .filter(
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
