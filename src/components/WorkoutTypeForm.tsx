import { useEffect, useState } from "react";
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
  const [selectedField, setSelectedField] = useState<HTMLDivElement | null>(
    null
  );
  const handleClick = (target: EventTarget, value: WorkoutType) => {
    const el = target as HTMLDivElement;
    setSelectedField(el);
    setValue(value);
  };
  useEffect(() => {
    if (selectedField) selectedField.classList.add("active-type-field");
  }, [selectedField]);
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {[
        { src: MuscleBuildingImg, value: WorkoutType.MuscleBuilding },
        { src: WeightLossImg, value: WorkoutType.WeightLoss },
        { src: EnduranceImg, value: WorkoutType.EnduranceWorkout },
        { src: StrengthImg, value: WorkoutType.StrengthWorkout },
      ].map((option) => (
        <Grid item xs={6}>
          <Box
            onClick={(event) => handleClick(event.currentTarget, option.value)}
          >
            <img
              src={option.src}
              style={{ maxWidth: "100%", height: "auto" }}
              alt="Man/Woman Training"
            />
          </Box>
        </Grid>
      ))}
      {value}
    </Grid>
  );
};
export default WorkoutTypeForm;
