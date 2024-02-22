import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { WorkoutType } from "../enums/WorkoutType";
import { RootState, setOpenedCreateProgramForm } from "../store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateProgramImg from "../images/create_program.webp";
import Logo from "../images/FitConnect_logo.webp";
import Slider from "react-slick";
import MediaForm from "./MediaForm";
import WorkoutTypeForm from "./WorkoutTypeForm";
import TrainingSessionForm from "./TrainingSessionForm";
import { WorkoutModel } from "../types/workout.model";
import { v4 as uuidv4 } from "uuid";
import { escape } from "querystring";
interface Props {
  setShowMessage: (show: boolean) => void;
}
const CreateProgramForm: React.FC<Props> = ({ setShowMessage }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const sliderSettings = {
    arrows: false,
    dots: true,
    swipe: false,
  };
  const model: WorkoutModel = {
    title: "",
    description: "",
    creator: `${currentUser.firstName} ${currentUser.lastName}`,
    creatorId: `${currentUser.id}`,
    rating: 0,
    members: 0,
    rates: 0,
    type: WorkoutType.All,
    timesPerWeek: 0,
    trainingSessions: [],
    membersChat: [],
    notifications: [],
    id: uuidv4(),
  };
  const [createdProgram, setCreatedProgram] = useState<WorkoutModel>(model);
  const sliderRef = useRef<Slider | null>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(setOpenedCreateProgramForm(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
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
                <MediaForm
                  sliderRef={sliderRef}
                  createdProgram={createdProgram}
                  setCreatedProgram={setCreatedProgram}
                />,
                <WorkoutTypeForm
                  sliderRef={sliderRef}
                  createdProgram={createdProgram}
                  setCreatedProgram={setCreatedProgram}
                />,
                <TrainingSessionForm
                  createdProgram={createdProgram}
                  setShowMessage={setShowMessage}
                />,
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
              alt="Man lifting dumbbell"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CreateProgramForm;
