import { Exercise } from "../types/exercise.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { FaClock } from "react-icons/fa6";
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
              src={item.gifUrl}
              style={{ width: "4rem", marginRight: "1rem" }}
              alt="exercise demonstration"
            />
            <Box>
              <Typography className="h4">{item.name}</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography className="h6" sx={{ opacity: "80%", mr: 3 }}>
                  3 x 12
                </Typography>
                <Typography
                  className="h6"
                  sx={{ opacity: "80%", display: "flex", alignItems: "center" }}
                >
                  3 min
                  <FaClock style={{ marginLeft: "0.3rem" }} />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Checkbox disabled />
        </Box>
      ))}
    </Box>
  );
};
export default TrainingSession;
