import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FitMan from "../images/fit_man.webp";
import Typography from "@mui/material/Typography";
import SuggestedWorkouts from "./SuggestedWorkouts";
import WorkoutTypesList from "./WorkoutTypesList";
import CoverImage from "./CoverImage";
const HomeView: React.FC = () => {
  const screenSize = useScreenSize();
  return (
    <>
      <CoverImage />
      <Box sx={{ paddingTop: `32rem` }}>
        <Box id="suggestions">
          <Typography className="h2 heading-color" sx={{ mb: 2 }}>
            Find Workout
          </Typography>
          <SuggestedWorkouts
            gridSpace={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}
          />
        </Box>
        <WorkoutTypesList />
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
          <Box>
            <Typography
              className="h3 heading-color"
              sx={{ pl: 3, width: "50%" }}
            >
              Empower the community with your unique workout program
            </Typography>
            <Button variant="contained" sx={{ ml: 3, mt: 2 }}>
              Create Program
            </Button>
          </Box>
          {screenSize > 550 && (
            <img
              src={FitMan}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              draggable="false"
              alt="Fit man posing"
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default HomeView;
