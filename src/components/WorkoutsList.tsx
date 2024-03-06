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
import Slider from "react-slick";
interface Props {
  sortBy: SortType;
  type: WorkoutType;
  workouts: WorkoutModel[] | undefined;
  isLoading: boolean;
  gridSpace: number[];
  programList?: boolean;
}
const sliderSettings = {
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
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
                    sm={gridSpace[1]}
                    md={gridSpace[2]}
                    lg={gridSpace[3]}
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
                    sm={gridSpace[1]}
                    md={gridSpace[2]}
                    lg={gridSpace[3]}
                  >
                    <Workout workout={workout} />
                  </Grid>
                ))}
          {programList && (
            <Grid item sm={gridSpace[1]} md={gridSpace[2]} lg={gridSpace[3]}>
              <CreateProgramAction width="100%" height="17.8rem" />
            </Grid>
          )}
        </Grid>
      ) : (
        <Slider className="workouts-slider" {...sliderSettings}>
          {isLoading
            ? Array(8)
                .fill(null)
                .map((_, i) => <WorkoutSkeleton key={i} />)
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
                  <Workout key={i} workout={workout} />
                ))}
        </Slider>
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
