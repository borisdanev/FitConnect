import { useRef, useEffect } from "react";
import { WorkoutModel } from "../types/workout.model";
import { WorkoutType } from "../enums/WorkoutType";
import { SortType } from "../enums/SortType";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Workout from "./Workout";
import CreateProgramAction from "./CreateProgramAction";
import EmptyState from "./EmptyState";
import NoResultIllustration from "../images/no_results.webp";
interface Props {
  sortBy: SortType;
  type: WorkoutType;
  workouts: WorkoutModel[] | undefined;
  isLoading: boolean;
  gridSpace: number;
  programList?: boolean;
}
const WorkoutList: React.FC<Props> = ({
  sortBy,
  type,
  workouts,
  isLoading,
  gridSpace,
  programList,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {}, [ref.current]);
  return (
    <Grid container rowSpacing={3} columnSpacing={2}>
      {isLoading ? (
        Array(8)
          .fill(null)
          .map((_, i) => (
            <Grid item key={i} xs={gridSpace}>
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
              <Skeleton variant="rectangular" width="14rem" height="0.8rem" />
            </Grid>
          ))
      ) : workouts && workouts.length > 0 ? (
        [...workouts]
          .sort(
            (a, b) =>
              (b[sortBy as keyof WorkoutModel] as number) -
              (a[sortBy as keyof WorkoutModel] as number)
          )
          .filter(
            (workout) => workout.type === type || type === WorkoutType.All
          )
          .map((workout: WorkoutModel, i) => (
            <Grid key={i} ref={i === 0 ? ref : null} item xs={gridSpace}>
              <Workout workout={workout} />
            </Grid>
          ))
      ) : (
        <Grid item xs={12}>
          <EmptyState
            text="Results Not Found"
            illustrationSrc={NoResultIllustration}
          />
        </Grid>
      )}
      {programList && (
        <Grid item xs={gridSpace}>
          <CreateProgramAction width="100%" height="17.8rem" />
        </Grid>
      )}
    </Grid>
  );
};
export default WorkoutList;
