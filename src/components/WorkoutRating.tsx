import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  useGetJoinedWorkoutQuery,
  useRateWorkoutMutation,
} from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
const WorkoutRating: React.FC = () => {
  const [filledStars, setFilledStars] = useState<number>(0);
  const [rateWorkout] = useRateWorkoutMutation();
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const { data, refetch } = useGetJoinedWorkoutQuery({
    userId: currentUser.id,
    workoutId: currentWorkout.id,
  });
  const [isRated, setIsRated] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  useEffect(() => {
    if (!data) {
      refetch();
      return;
    }
    setIsRated(data.isRated);
  }, [data]);
  const handleRateWorkout = () => {
    setShowMessage(true);
    setIsRated(true);
    rateWorkout({
      id: currentWorkout.id,
      uid: currentUser.id,
      rating: {
        currentRating: currentWorkout.rating,
        newRating: filledStars,
        totalRates: currentWorkout.rates,
      },
    });
  };
  return (
    <>
      {!isRated && (
        <Box onMouseLeave={() => setFilledStars(0)} onClick={handleRateWorkout}>
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
                  onClick={() => setFilledStars(i + 1)}
                />
              )
            )}
        </Box>
      )}
      {showMessage && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "hsl(151, 100%, 85%)",
            border: "2.5px solid #00e676",
            borderLeftWidth: "6px",
            borderRadius: "0.2rem",
            width: "17rem",
            color: "#29332e",
            px: 1,
            py: 2,
          }}
          className="showAndFade"
        >
          <FaRegFaceSmileBeam style={{ color: "#00e676" }} className="h3" />
          <Typography
            sx={{ ml: 1, fontWeight: "550 !important" }}
            className="h5"
          >
            Thank you for your rating!
          </Typography>
        </Box>
      )}
    </>
  );
};
export default WorkoutRating;
