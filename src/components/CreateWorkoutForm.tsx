import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateProgramImg from "../images/create_program.jpg";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import TitleForm from "./TitleForm";
import WorkoutTypeForm from "./WorkoutTypeForm";
const CreateWorkoutForm: React.FC = () => {
  const sliderSettings = {
    arrows: false,
    dots: true,
    swipe: false,
  };
  const dispatch = useDispatch();
  const sliderRef = useRef<Slider | null>(null);
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: 1201,
        backdropFilter: "blur(1.8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container width="70rem">
        <Grid item xs={7}>
          <Box
            sx={{
              bgcolor: "#2e4c3e",
              p: 2,
              maxWidth: "100% !important",
              height: "30rem",
            }}
          >
            <Typography className="h3">Create Program</Typography>
            <Slider ref={sliderRef} {...sliderSettings}>
              {[
                <TitleForm sliderRef={sliderRef} />,
                <WorkoutTypeForm sliderRef={sliderRef} />,
              ].map((item, i) => (
                <Box key={i} sx={{ height: "100%" }}>
                  {item}
                </Box>
              ))}
              <Box>Something</Box>
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box height="100%">
            <img
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
              src={CreateProgramImg}
              alt="Man lifting barbell"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CreateWorkoutForm;
