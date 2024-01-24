import Box from "@mui/material/Box";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface Props {
  timesPerWeek: number;
}
const WorkoutProgress: React.FC<Props> = ({ timesPerWeek }) => {
  return (
    <Box sx={{ width: "50%" }}>
      <CircularProgressbar
        value={50}
        background={true}
        backgroundPadding={2}
        circleRatio={0.5}
      />
    </Box>
  );
};
export default WorkoutProgress;
