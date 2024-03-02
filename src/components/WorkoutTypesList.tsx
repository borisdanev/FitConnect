import { useDispatch } from "react-redux";
import { setWorkoutType } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import MuslceBuildingType from "../images/muscle_building_type.webp";
import StrenghType from "../images/strength_type.webp";
import WeightLossType from "../images/weight_loss_type.webp";
import EnduranceType from "../images/endurance_type.webp";
import { WorkoutType } from "../enums/WorkoutType";
const WorkoutTypesList: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ my: 5 }}>
      <Typography className="h2 heading-color" sx={{ mb: 2 }}>
        Workout Types
      </Typography>
      <Grid container columnSpacing={2}>
        {[
          {
            text: "Muscle Building",
            src: MuslceBuildingType,
            type: WorkoutType.MuscleBuilding,
          },
          {
            text: "Strength",
            src: StrenghType,
            type: WorkoutType.StrengthWorkout,
          },
          {
            text: "Weight Loss",
            src: WeightLossType,
            type: WorkoutType.WeightLoss,
          },
          {
            text: "Endurance",
            src: EnduranceType,
            type: WorkoutType.EnduranceWorkout,
          },
        ].map((item) => (
          <Grid item xs={3}>
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
                src={item.src}
                style={{
                  width: "100%",
                  height: "18.81rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                alt={item.text}
              />
              <Typography className="h3 " textAlign="center" sx={{}}>
                {item.text}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "end", mt: 2, pr: 1 }}
              >
                <Link
                  href="#suggestions"
                  underline="none"
                  onClick={() => dispatch(setWorkoutType(item.type))}
                >
                  FIND WORKOUTS
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default WorkoutTypesList;
