import { useSelector, useDispatch } from "react-redux";
import {
  setVisibleExerciseSelection,
  RootState,
  removeFromSelectedDays,
  setVisibleAlert,
} from "../store";
import { FormikProps } from "formik";
import { ExerciseModel } from "../types/exercise.model";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
import ExerciseDetailsSelection from "./ExerciseDetailsSelection";
interface Props {
  formik: FormikProps<{ [key: string]: string }>;
  selectedExercises: ExerciseModel[];
}
const TrainingSessionDetails: React.FC<Props> = ({
  formik,
  selectedExercises,
}) => {
  const dispatch = useDispatch();
  const visibleExerciseSelection = useSelector(
    (state: RootState) => state.program.visibleExerciseSelection
  );
  const visibleAlert = useSelector(
    (state: RootState) => state.program.visibleAlertMessage
  );
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
  );
  const handleClick = () => {
    // if (Object.keys(formik.errors).length > 0) return;
    dispatch(setVisibleExerciseSelection(true));
  };
  const handleRemoveSession = () => {
    dispatch(removeFromSelectedDays());
    dispatch(setVisibleAlert(false));
  };
  const trainingSessions = useSelector(
    (state: RootState) => state.program.trainingSessions
  );
  console.log(
    trainingSessions
      .filter((item) => item.exercises.length > 0)
      .map((item) => item.exercises)
  );

  return (
    <Box
      sx={{
        bgcolor: "#29332e",
        py: 2,
        px: 4,
        borderRadius: "0.5rem",
        position: "relative",
        width: "25rem",
      }}
    >
      <TextField label="Session Name" />
      {selectedExercises.map((item, i) => (
        <ExerciseDetailsSelection
          key={i}
          name={item.name}
          gifUrl={item.gifUrl}
          formik={formik}
          index={i}
        />
      ))}
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          color: "white",
          my: 2,
          textTransform: "none",
        }}
        onClick={handleClick}
        // type={formik ? "button" : "submit"}
      >
        <CiSquarePlus fontSize="2rem" />
        <Typography sx={{ ml: 1 }}>Add Exercise</Typography>
      </Button>
      {visibleExerciseSelection && <ExerciseSelection />}
      {visibleAlert[currentSessionIndex] && (
        <Alert
          variant="outlined"
          severity="error"
          action={
            <Button
              variant="outlined"
              sx={{ color: "white" }}
              onClick={() => handleRemoveSession()}
            >
              Yes
            </Button>
          }
        >
          Are you sure you want to remove this training session
        </Alert>
      )}
    </Box>
  );
};
export default TrainingSessionDetails;
