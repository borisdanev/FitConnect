import React from "react";
import { WorkoutModel } from "../types/workout.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HiUsers } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
interface Props {
  workout: WorkoutModel;
}
const Workout: React.FC<Props> = ({ workout }) => {
  return (
    <Box>
      <img src={workout.img_url} alt="workout cover image" />
      <Typography variant="h4" className="h3">
        {workout.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{workout.participants}</Typography>
        <HiUsers />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{workout.rating}</Typography>
        {new Array(5).fill(null).map((item, i) => (
          <FaStar
            key={i}
            style={{
              marginRight: "0.3rem",
              color: "rgb(0, 230, 118)",
            }}
          />
        ))}
        ({workout.rates})
      </Box>
    </Box>
  );
};
export default Workout;
