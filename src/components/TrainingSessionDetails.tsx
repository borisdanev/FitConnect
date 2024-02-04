import { useSelector, useDispatch } from "react-redux";
import {
  setVisibleExerciseSelection,
  setAgreeToRemove,
  RootState,
} from "../store";
import { FormikProps } from "formik";
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
}
const TrainingSessionDetails: React.FC<Props> = ({ formik }) => {
  const dispatch = useDispatch();
  const visibleExerciseSelection = useSelector(
    (state: RootState) => state.program.visibleExerciseSelection
  );
  const selectedExercises = useSelector(
    (state: RootState) => state.program.selectedExercises
  );
  const visibleAlert = useSelector(
    (state: RootState) => state.program.visibleAlertMessage
  );
  const handleClick = () => {
    // if (Object.keys(formik.errors).length > 0) return;
    dispatch(setVisibleExerciseSelection(true));
  };
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
      {visibleAlert && (
        <Alert
          variant="outlined"
          severity="error"
          action={
            <Button
              variant="outlined"
              sx={{ color: "white" }}
              onClick={() => dispatch(setAgreeToRemove(true))}
            >
              Yes
            </Button>
          }
        >
          Are you sure you want to remove this trainig session
        </Alert>
      )}
    </Box>
  );
};
export default TrainingSessionDetails;
