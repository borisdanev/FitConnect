import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
interface Props {
  reps: number;
  checkboxId: string;
  handleChange: (event: ChangeEvent) => void;
  finishedSets: string[];
}
const ExerciseSet: React.FC<Props> = ({
  reps,
  checkboxId,
  handleChange,
  finishedSets,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        mt: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#37423d",
        borderRadius: "0.5rem",
        pl: 1,
      }}
    >
      <Typography>{reps} reps</Typography>
      <Checkbox
        id={checkboxId}
        name={checkboxId}
        checked={finishedSets.includes(checkboxId)}
        onChange={(event) => handleChange(event)}
      />
    </Box>
  );
};
export default ExerciseSet;
