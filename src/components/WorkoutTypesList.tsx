import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuslceBuildingType from "../images/muscle_building_type.webp";
import StrenghType from "../images/strength_type.webp";
import WeightLossType from "../images/weight_loss_type.webp";
import EnduranceType from "../images/endurance_type.webp";
import { WorkoutType } from "../enums/WorkoutType";
import Slider from "react-slick";
import WorkoutTypeItem from "./WorkoutType";
const sliderSettings = {
  arrows: true,
  dots: false,
  swipe: true,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const WorkoutTypesList: React.FC = () => {
  const screenSize = useScreenSize();
  const workoutTypes = [
    {
      text: "Muscle Building",
      src: MuslceBuildingType,
      type: WorkoutType.MuscleBuilding,
    },
    {
      text: "Strength",
      src: StrenghType,
      type: WorkoutType.StrengthWorkout,
    },
    {
      text: "Weight Loss",
      src: WeightLossType,
      type: WorkoutType.WeightLoss,
    },
    {
      text: "Endurance",
      src: EnduranceType,
      type: WorkoutType.EnduranceWorkout,
    },
  ];
  return (
    <Box sx={{ my: 5 }}>
      <Typography className="h2 heading-color" sx={{ mb: 2 }}>
        Workout Types
      </Typography>
      {screenSize > 1300 ? (
        <Grid container columnSpacing={2} rowSpacing={2}>
          {workoutTypes.map((item, i) => (
            <Grid key={i} item xs={12} md={6} lg={3}>
              <WorkoutTypeItem
                src={item.src}
                text={item.text}
                type={item.type}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Slider {...sliderSettings}>
          {workoutTypes.map((item, i) => (
            <WorkoutTypeItem
              key={i}
              src={item.src}
              text={item.text}
              type={item.type}
            />
          ))}
        </Slider>
      )}
    </Box>
  );
};
export default WorkoutTypesList;
