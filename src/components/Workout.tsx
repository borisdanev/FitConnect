import React from "react";
import { useDispatch } from "react-redux";
import { selectView } from "../store";
import { setWorkout } from "../store";
import { ViewEnum } from "../enums/View";
import { WorkoutModel } from "../types/workout.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HiUsers } from "react-icons/hi";
import RatingStars from "./RatingStars";
interface Props {
  workout: WorkoutModel;
}
const Workout: React.FC<Props> = ({ workout }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setWorkout(workout));
    dispatch(selectView(ViewEnum.Workout));
  };
  return (
    <Box onClick={handleClick}>
      <img
        src={workout.img_url}
        style={{ maxWidth: "100%", height: "auto" }}
        alt="workout cover image"
      />
      <Typography variant="h4" className="h3">
        {workout.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{workout.participants}</Typography>
        <HiUsers />
      </Box>
      <RatingStars rating={workout.rating} rates={workout.rates} />
    </Box>
  );
};
export default Workout;
