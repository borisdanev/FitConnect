import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FitMan from "../images/fit_man.webp";
import Typography from "@mui/material/Typography";
import WorkoutList from "./WorkoutsList";
const HomeView: React.FC = () => {
  return (
    <Box>
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
      <WorkoutList />
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          height: "5rem",
          alignItems: "center",
          borderRadius: "10px",
          px: 5,
        }}
        className="reverse-gradient"
      >
        <Typography className="h3" sx={{ width: "50%" }}>
          Upload your own workout program and help the community
        </Typography>
        <Button variant="contained" sx={{ color: "white" }}>
          Create Program
        </Button>
      </Box>
    </Box>
  );
};
export default HomeView;
