import React, { useState } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuscleBuildingImg from "../images/muscle_building.webp";
import WeightLossImg from "../images/weight_loss.webp";
import EnduranceImg from "../images/endurance.webp";
import StrengthImg from "../images/strength.webp";
import FlexibilityImg from "../images/flexibility.jpg";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import FormContainer from "./FormContainer";
import { WorkoutModel } from "../types/workout.model";
interface Props {
  sliderRef: React.RefObject<Slider>;
  createdProgram: WorkoutModel;
  setCreatedProgram: (program: WorkoutModel) => void;
}
const WorkoutTypeForm: React.FC<Props> = ({
  sliderRef,
  createdProgram,
  setCreatedProgram,
}) => {
  const [value, setValue] = useState<WorkoutType>(WorkoutType.All);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (!selectedField || !sliderRef.current) return;
    setCreatedProgram({ ...createdProgram, type: value });
    sliderRef.current.slickGoTo(2);
  };
  return (
    <FormContainer handleSubmit={handleSubmit} text="Workout Type">
      <Grid container rowSpacing={2} columnSpacing={2}>
        {[
          { src: MuscleBuildingImg, value: WorkoutType.MuscleBuilding },
          { src: WeightLossImg, value: WorkoutType.WeightLoss },
          { src: EnduranceImg, value: WorkoutType.EnduranceWorkout },
          { src: StrengthImg, value: WorkoutType.StrengthWorkout },
        ].map((option, i) => (
          <Grid key={i} item xs={6}>
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
      </Grid>
    </FormContainer>
  );
};
export default WorkoutTypeForm;
