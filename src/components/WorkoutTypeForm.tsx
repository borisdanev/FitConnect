import { useState } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import Box from "@mui/material/Box";
import MuscleBuildingImg from "../images/muscle_building.jpg";
import WeightLossImg from "../images/weight_loss.jpg";
import EnduranceImg from "../images/endurance.jpg";
import StrengthImg from "../images/strength.jpg";
import FlexibilityImg from "../images/flexibility.jpg";
import Grid from "@mui/material/Grid";
const WorkoutTypeForm: React.FC = () => {
  const [value, setValue] = useState<string>("");
  return (
    <Grid container>
      {[
        { src: MuscleBuildingImg, value: WorkoutType.MuscleBuilding },
        { src: WeightLossImg, value: WorkoutType.WeightLoss },
        { src: EnduranceImg, value: WorkoutType.EnduranceWorkout },
        { src: StrengthImg, value: WorkoutType.StrengthWorkout },
        { src: FlexibilityImg, value: WorkoutType.Flexibility },
      ].map((option) => (
        <Grid item xs={4}>
          <Box onClick={() => setValue(option.value)}>
            <img
              src={option.src}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
      ))}
      {value}
    </Grid>
  );
};
export default WorkoutTypeForm;
