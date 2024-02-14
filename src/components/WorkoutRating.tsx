import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useRateWorkoutMutation } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const WorkoutRating: React.FC = () => {
  const [filledStars, setFilledStars] = useState<number>(0);
  const [rateWorkout] = useRateWorkoutMutation();
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  return (
    <Box
      onMouseLeave={() => setFilledStars(0)}
      onClick={() => {
        rateWorkout({
          id: currentWorkout.id,
          rating: {
            currentRating: currentWorkout.rating,
            newRating: filledStars,
            totalRates: currentWorkout.rates,
          },
        });
      }}
    >
      <Typography>Leave a rating</Typography>
      {Array(5)
        .fill(null)
        .map((_, i) =>
          i < filledStars ? (
            <FaStar
              key={i}
              color="#00e676"
              style={{ marginRight: "0.5rem" }}
              onMouseEnter={() => setFilledStars(i)}
            />
          ) : (
            <FaRegStar
              key={i}
              color="#00e676"
              style={{ marginRight: "0.5rem" }}
              onMouseEnter={() => setFilledStars(i + 1)}
            />
          )
        )}
    </Box>
  );
};
export default WorkoutRating;
