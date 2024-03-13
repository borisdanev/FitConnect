import React from "react";
import { useDispatch } from "react-redux";
import { useGetStoragePictureQuery, selectView, setWorkout } from "../store";
import { ViewEnum } from "../enums/View";
import { WorkoutModel } from "../types/workout.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HiUsers } from "react-icons/hi";
import WorkoutImg from "./WorkoutImg";
import RatingStars from "./RatingStars";
import Skeleton from "@mui/material/Skeleton";
interface Props {
  workout: WorkoutModel;
}
const Workout: React.FC<Props> = ({ workout }) => {
  const dispatch = useDispatch();
  const { data: workoutSrc, isLoading } = useGetStoragePictureQuery(workout.id);

  const handleClick = () => {
    dispatch(setWorkout(workout));
    dispatch(selectView(ViewEnum.Workout));
  };
  return (
    <Box onClick={handleClick}>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="12.5rem" />
      ) : (
        <WorkoutImg workoutId={workout.id} />
      )}
      <Typography variant="h4" className="h3">
        {workout.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{workout.members}</Typography>
        <HiUsers />
      </Box>
      <RatingStars rating={workout.rating} rates={workout.rates} />
    </Box>
  );
};
export default Workout;
