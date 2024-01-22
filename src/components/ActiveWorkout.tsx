import Box from "@mui/material/Box";
import { TrainingSessionModel } from "../types/trainingSession.model";
interface Props {
  trainingSession: TrainingSessionModel;
}
const ActiveWorkout: React.FC<Props> = ({ trainingSession }) => {
  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
      {trainingSession.name}
    </Box>
  );
};
export default ActiveWorkout;
