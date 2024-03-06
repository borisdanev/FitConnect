import { useDispatch } from "react-redux";
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
  return (
    <Box
      sx={{
        width: "100%",
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
          <Typography sx={{ fontSize: "clamp(0.75rem, 2vw, 1.rem)" }}>
            FIND WORKOUTS
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
export default WorkoutTypeItem;
