import useScreenSize from "../hooks/useScreenSize";
import { WorkoutModel } from "../types/workout.model";
import { WorkoutType } from "../enums/WorkoutType";
import { SortType } from "../enums/SortType";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import WorkoutSkeleton from "./WorkoutSkeleton";
import Workout from "./Workout";
import CreateProgramAction from "./CreateProgramAction";
import EmptyState from "./EmptyState";
import NoResultIllustration from "../images/no_results.webp";
import WorkoutSlider from "./WorkoutSlider";
import { BreakPoints } from "../types/breakpoints.model";
interface Props {
  sortBy: SortType;
  type: WorkoutType;
  workouts: WorkoutModel[] | undefined;
  isLoading: boolean;
  gridSpace: BreakPoints;
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
  const screenSize = useScreenSize();
  return (
    <>
      {screenSize > 900 ? (
        <Grid container rowSpacing={3} columnSpacing={2}>
          {isLoading
            ? Array(8)
                .fill(null)
                .map((_, i) => (
                  <Grid
                    item
                    key={i}
                    sm={gridSpace.sm}
                    md={gridSpace.md}
                    lg={gridSpace.lg}
                  >
                    <WorkoutSkeleton />
                  </Grid>
                ))
            : workouts &&
              workouts.length > 0 &&
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
                  <Grid
                    key={i}
                    item
                    sm={gridSpace.sm}
                    md={gridSpace.md}
                    lg={gridSpace.lg}
                  >
                    <Workout workout={workout} />
                  </Grid>
                ))}
          {programList && (
            <Grid item sm={gridSpace.sm} md={gridSpace.md} lg={gridSpace.lg}>
              <CreateProgramAction width="100%" height="17.8rem" />
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          {workouts && workouts.length > 0 && (
            <WorkoutSlider
              isLoading={isLoading}
              workouts={workouts}
              sortBy={sortBy}
              type={type}
            />
          )}
        </>
      )}
      {screenSize < 900 && programList && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CreateProgramAction width="7rem" height="7rem" />
        </Box>
      )}
      {workouts && workouts.length === 0 && (
        <EmptyState
          text="Results Not Found"
          illustrationSrc={NoResultIllustration}
        />
      )}
    </>
  );
};
export default WorkoutList;
