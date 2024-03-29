import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import {
  RootState,
  useGetJoinedWorkoutQuery,
  setFinishedTrainingSessions,
} from "../store";
import { WorkoutModel } from "../types/workout.model";
import { User } from "../types/user.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface Props {
  timesPerWeek: number;
  variant: string;
  currentWorkout: WorkoutModel;
  currentUser: User;
}
const WorkoutProgress: React.FC<Props> = ({
  timesPerWeek,
  variant,
  currentUser,
  currentWorkout,
}) => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  const finishedTrainingSessions = useSelector(
    (state: RootState) => state.activeWorkout.finishedTrainingSessions
  );
  const { data } = useGetJoinedWorkoutQuery({
    userId: currentUser.id,
    workoutId: currentWorkout.id,
  });
  const calculateValue = (finishedSessions: number) => {
    return (finishedSessions / timesPerWeek) * 100;
  };
  useEffect(() => {
    if (!data) return;
    dispatch(setFinishedTrainingSessions(data.finishedSessions));
  }, [data]);
  return (
    <Box
      sx={{ width: screenSize > 600 ? "100%" : "clamp(15rem, 40vw, 20rem)" }}
    >
      <CircularProgressbarWithChildren
        value={
          variant === "current"
            ? calculateValue(finishedTrainingSessions)
            : calculateValue(data ? data.previousWeekProgress : 0)
        }
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: "#00e676",
          trailColor: "rgb(255, 255, 255)",
        })}
      >
        <Typography
          className="h4"
          sx={{ width: "60%", textAlign: "center", color: "#00e676" }}
        >
          {variant === "current"
            ? "Sessions Finished This Week"
            : "Sessions Finished Previous Week"}
        </Typography>
        {Array(timesPerWeek)
          .fill(null)
          .map((_, index) => (
            <Box
              key={index}
              style={{
                position: "absolute",
                height: "100%",
                transform: `rotate(${index * (1 / timesPerWeek)}turn)`,
              }}
            >
              <Box
                sx={{
                  background: "#29332e",
                  width: "5px",
                  height: `${10}%`,
                }}
              />
            </Box>
          ))}
      </CircularProgressbarWithChildren>
    </Box>
  );
};
export default WorkoutProgress;
