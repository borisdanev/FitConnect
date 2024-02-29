import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuslceBuildingType from "../images/muscle_building_type.webp";
import StrenghType from "../images/strength_type.webp";
import WeightLossType from "../images/weight_loss_type.webp";
import EnduranceType from "../images/endurance_type.webp";
const WorkoutTypesList: React.FC = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography className="h2 heading-color" sx={{ mb: 2 }}>
        Workout Types
      </Typography>
      <Grid container columnSpacing={2}>
        {[
          { text: "Muscle Building", src: MuslceBuildingType },
          { text: "Strength", src: StrenghType },
          { text: "Weight Loss", src: WeightLossType },
          { text: "Endurance", src: EnduranceType },
        ].map((item) => (
          <Grid item xs={3}>
            <Box
              sx={{
                width: "100%",
                height: "25rem",
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
                bgcolor: "#37423d",
              }}
            >
              <img
                src={item.src}
                style={{
                  width: "100%",
                  height: "18.81rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <Typography
                className="h3 heading-color"
                textAlign="center"
                sx={{}}
              >
                {item.text}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "end", mt: 2, pr: 1 }}
              >
                <Button>Find Workouts</Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default WorkoutTypesList;
