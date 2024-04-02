import { useState } from "react";
import { useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { RootState } from "../store";
import Box from "@mui/material/Box";
import CreateProgramForm from "./CreateProgramForm";
import SuccessMessage from "./SuccessMessage";
import { IoMdCheckmark } from "react-icons/io";
import FitMan from "../images/fit_man.webp";
import Typography from "@mui/material/Typography";
import SuggestedWorkouts from "./SuggestedWorkouts";
import WorkoutTypesList from "./WorkoutTypesList";
import CoverImage from "./CoverImage";
import CreateProgramAction from "./CreateProgramAction";
const HomeView: React.FC = () => {
  const screenSize = useScreenSize();
  const openedCreateProgramForm = useSelector(
    (state: RootState) => state.form.openedCreateProgramForm
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
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
          sx={{
            height: "15rem",
            bgcolor: "#37423d",
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
              sx={{
                pl: 3,
                width: screenSize > 550 ? "clamp(19rem, 40vw, 30rem)" : "90%",
              }}
            >
              Empower the community with your unique workout program
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CreateProgramAction
                width={"clamp(5.5rem, 20vw, 6.5rem)"}
                height="clamp(5.5rem, 20vw, 6.5rem)"
                bgColor="#29332e"
              />
            </Box>
            {openedCreateProgramForm && (
              <CreateProgramForm setShowMessage={setShowMessage} />
            )}
          </Box>
          {screenSize > 550 && (
            <img
              src={FitMan}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "clamp(15rem, 30vw, 22.5rem)",
                height: "100%",
                objectFit: "cover",
              }}
              draggable="false"
              loading="lazy"
              alt="Fit man posing"
            />
          )}
          {showMessage && (
            <SuccessMessage
              width="20rem"
              message="Program created successfully!"
              Icon={IoMdCheckmark}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default HomeView;
