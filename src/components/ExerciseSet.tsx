import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
interface Props {
  weight: number;
  reps: number;
  index: number;
  handleChange: (event: ChangeEvent) => void;
}
const ExerciseSet: React.FC<Props> = ({
  weight,
  reps,
  index,
  handleChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>
        {weight}kg x {reps}
      </Typography>
      <Checkbox
        checked={false}
        id={`${index}`}
        onChange={(event) => handleChange(event)}
      />
    </Box>
  );
};
export default ExerciseSet;
