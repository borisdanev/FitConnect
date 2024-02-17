import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FitMan from "../images/fit_man.webp";
import Typography from "@mui/material/Typography";
import WorkoutList from "./WorkoutsList";
import SuggestedWorkouts from "./SuggestedWorkouts";
const HomeView: React.FC = () => {
  return (
    <>
      <Box
        className="gradient"
        sx={{
          height: "15rem",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography className="h2" sx={{ pl: 3, width: "50%" }}>
          Find Workout That Aligns With Your Goals The Best
        </Typography>
        <img
          src={FitMan}
          style={{
            maxHeight: "100%",
          }}
          draggable="false"
          alt="Fit man posing"
        />
      </Box>
      <SuggestedWorkouts />
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          height: "8rem",
          alignItems: "center",
          borderRadius: "10px",
          px: 5,
        }}
        className="reverse-gradient"
      >
        <Typography className="h3" sx={{ width: "60%" }}>
          Empower the community with your unique workout program - inspire
          others to reach their goals!
        </Typography>
        <Button variant="contained">Create Program</Button>
      </Box>
    </>
  );
};
export default HomeView;
