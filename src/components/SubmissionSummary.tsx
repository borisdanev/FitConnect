import { WorkoutModel } from "../types/workout.model";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface Props {
  createdProgram: WorkoutModel;
}
const SubmissionSummary: React.FC<Props> = ({ createdProgram }) => {
  return (
    <Box>
      <Box>
        <Typography>Title</Typography>
        <Typography>{createdProgram.title}</Typography>
      </Box>
      <Button variant="contained">Create Program</Button>
    </Box>
  );
};
export default SubmissionSummary;
