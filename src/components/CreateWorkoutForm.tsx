import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateProgramImg from "../images/create_program.png";
import Logo from "../images/FitConnect_logo.webp";
import Slider from "react-slick";
import TitleForm from "./TitleForm";
import WorkoutTypeForm from "./WorkoutTypeForm";
import SessionForm from "./SessionForm";
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
        zIndex: 1201,
        backdropFilter: "blur(2.2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="position-fill"
    >
      <Grid container width="70rem">
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={Logo}
              style={{ maxWidth: "100%", height: "auto" }}
              alt="Logo"
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              bgcolor: "#2e4c3e",
              p: 2,
              maxWidth: "100% !important",
              height: "30rem",
            }}
          >
            <Slider ref={sliderRef} {...sliderSettings}>
              {[
                <TitleForm sliderRef={sliderRef} />,
                <WorkoutTypeForm sliderRef={sliderRef} />,
                <SessionForm />,
              ].map((item, i) => (
                <Box key={i} sx={{ height: "100%" }}>
                  {item}
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box height="100%" bgcolor="#2e4c3e">
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
