import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface Props {
  timesPerWeek: number;
}
const WorkoutProgress: React.FC<Props> = ({ timesPerWeek }) => {
  const finishedTrainingSession = useSelector(
    (state: RootState) => state.activeWorkout.isFinishedTrainingSession
  );
  return (
    <Box sx={{ width: "50%" }}>
      <CircularProgressbarWithChildren
        value={finishedTrainingSession ? 33.33 : 0}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: "#00e676",
          trailColor: "rgb(255, 255, 255)",
        })}
      >
        {Array(timesPerWeek)
          .fill(null)
          .map((_, index) => (
            <Box
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
