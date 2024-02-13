import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
interface Props {
  reps: number;
  checkBoxId: string;
  handleChange: (event: ChangeEvent) => void;
}
const ExerciseSet: React.FC<Props> = ({ reps, checkBoxId, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{reps} reps</Typography>
      <Checkbox
        id={checkBoxId}
        defaultChecked={false}
        onChange={(event) => handleChange(event)}
      />
    </Box>
  );
};
export default ExerciseSet;
