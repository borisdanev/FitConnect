import { Exercise } from "../types/exercise.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
interface Props {
  exercises: Exercise[];
}
const TrainingSession: React.FC<Props> = ({ exercises }) => {
  return (
    <Box>
      {exercises.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            width: "100%",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <img
              src={item.gif_url}
              style={{ width: "4rem", marginRight: "1rem" }}
              alt="exercise demonstration"
            />
            <Typography>{item.name}</Typography>
          </Box>
          <Checkbox />
        </Box>
      ))}
    </Box>
  );
};
export default TrainingSession;
