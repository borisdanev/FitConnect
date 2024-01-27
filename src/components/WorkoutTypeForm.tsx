import React, { useState } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuscleBuildingImg from "../images/muscle_building.jpg";
import WeightLossImg from "../images/weight_loss.jpg";
import EnduranceImg from "../images/endurance.jpg";
import StrengthImg from "../images/strength.jpg";
import FlexibilityImg from "../images/flexibility.jpg";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
interface Props {
  sliderRef: React.RefObject<Slider>;
}
const WorkoutTypeForm: React.FC<Props> = ({ sliderRef }) => {
  const [value, setValue] = useState<string>("");
  const [selectedField, setSelectedField] = useState<HTMLDivElement | null>(
    null
  );
  const handleClick = (target: EventTarget, value: WorkoutType) => {
    const el = target as HTMLDivElement;
    if (selectedField) selectedField.classList.remove("active-type-field");
    el.classList.add("active-type-field");
    setSelectedField(el);
    setValue(value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !sliderRef.current) return;
    sliderRef.current.slickGoTo(2);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {[
          { src: MuscleBuildingImg, value: WorkoutType.MuscleBuilding },
          { src: WeightLossImg, value: WorkoutType.WeightLoss },
          { src: EnduranceImg, value: WorkoutType.EnduranceWorkout },
          { src: StrengthImg, value: WorkoutType.StrengthWorkout },
        ].map((option) => (
          <Grid item xs={6}>
            <Box
              sx={{ position: "relative" }}
              className="type-field"
              onClick={(event) =>
                handleClick(event.currentTarget, option.value)
              }
            >
              <img
                src={option.src}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="Man/Woman Training"
              />
              <Box
                sx={{
                  bgcolor: "black",
                  position: "absolute",
                }}
                className="position-fill overlay"
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="position-fill text-container"
              >
                <Typography className="h4">{option.value}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        {value}
      </Grid>
      <Button type="submit">Next</Button>
    </form>
  );
};
export default WorkoutTypeForm;
