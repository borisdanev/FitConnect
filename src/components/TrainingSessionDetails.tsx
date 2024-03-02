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
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
import ExerciseDetailsSelection from "./ExerciseDetailsSelection";
import red from "@mui/material/colors/red";
import grey from "@mui/material/colors/grey";
import FormAlert from "./FormAlert";
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
      <TextField
        id={`name${currentSessionIndex}`}
        name={`name${currentSessionIndex}`}
        value={
          Object.keys(formik.values).includes(`name${currentSessionIndex}`)
            ? formik.values[`name${currentSessionIndex}`]
            : ""
        }
        FormHelperTextProps={{ sx: { color: "#59B386", fontSize: "0.9rem" } }}
        label="Session Name"
        helperText={formik.errors[`name${currentSessionIndex}`]}
        onChange={formik.handleChange}
      />
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
        <FormAlert>
          <Typography color="black">
            Are you sure you want to remove this training session
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: grey[300],
                color: grey[700],
                mr: 2,
                "&:hover": {
                  backgroundColor: grey[400],
                },
              }}
              onClick={() => dispatch(setVisibleAlert(false))}
            >
              Cancle
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: red[400],
                borderColor: red[200],
                "&:hover": {
                  backgroundColor: red[100],
                  borderColor: red[200],
                },
              }}
              onClick={() => handleRemoveSession()}
            >
              Yes
            </Button>
          </Box>
        </FormAlert>
      )}
    </Box>
  );
};
export default TrainingSessionDetails;
