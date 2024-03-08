import { useDispatch } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { setWorkoutType } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { WorkoutType } from "../enums/WorkoutType";
interface Props {
  src: string;
  text: string;
  type: WorkoutType;
}
const WorkoutTypeItem: React.FC<Props> = ({ src, text, type }) => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  return (
    <Box
      sx={{
        width: screenSize > 540 ? "100%" : screenSize > 400 ? "70%" : "80%",
        margin: screenSize < 540 ? "0 auto" : "",
        height: "25rem",
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
        bgcolor: "#37423d",
      }}
    >
      <img
        src={src}
        style={{
          width: "100%",
          height: "18.81rem",
          // aspectRatio: "1",
          objectFit: "cover",
          borderRadius: "50%",
        }}
        alt={text}
      />
      <Typography className="h3 " textAlign="center" sx={{}}>
        {text}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2, pr: 1 }}>
        <Link
          href="#suggestions"
          underline="none"
          onClick={() => dispatch(setWorkoutType(type))}
        >
          <Typography sx={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
            FIND WORKOUTS
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
export default WorkoutTypeItem;
