import { useSelector } from "react-redux";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RatingStars from "./RatingStars";
import TrainingSessionList from "./TrainingSessionList";
const WorkoutView: React.FC = () => {
  const workout = useSelector((state: RootState) => state.currentWorkout.value);
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={8}>
            <Typography className="h1">{workout?.title}</Typography>
            <Typography className="h4">{workout?.description}</Typography>
            <RatingStars
              rating={workout ? workout.rating : 0}
              rates={workout ? workout.rates : 0}
            />
            <Typography>Created by: {workout?.creator}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={workout?.img_url} alt="workout program cover" />
              <Button variant="contained" sx={{ width: "100%" }}>
                Join Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <TrainingSessionList trainingSessions={workout?.training_sessions} />
      </Grid>
    </Grid>
  );
};
export default WorkoutView;
