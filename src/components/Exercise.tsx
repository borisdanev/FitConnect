import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentExerciseIndex } from "../store";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { FaClock } from "react-icons/fa6";
interface Props {
  id: string;
  gifUrl: string;
  name: string;
  index: number;
  totalExercises: number;
}
const Exercise: React.FC<Props> = ({
  id,
  gifUrl,
  name,
  index,
  totalExercises,
}) => {
  const dispatch = useDispatch();
  const finishedExercises = useSelector(
    (state: RootState) => state.activeWorkout.finishedExercises
  );
  useEffect(() => {
    if (
      finishedExercises.includes(id) &&
      finishedExercises.length < totalExercises
    ) {
      dispatch(setCurrentExerciseIndex(index + 1));
    }
  }, [finishedExercises]);
  return (
    <Box
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
          src={gifUrl}
          style={{ width: "4rem", marginRight: "1rem" }}
          alt="exercise demonstration"
        />
        <Box>
          <Typography className="h4">{name}</Typography>
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
      <Checkbox disabled checked={finishedExercises.includes(id)} />
    </Box>
  );
};
export default Exercise;
