import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setVisibleExerciseSelection,
  setAgreeToRemove,
} from "../store";
import { WorkoutModel } from "../types/workout.model";
import { useFormik } from "formik";
import useDynamicSchema from "../hooks/useDynamicSchema";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
import ExerciseDetailsSelection from "./ExerciseDetailsSelection";
import useDynamicInitialValues from "../hooks/useDynamicInitialValues";
import useAdjustInputValues from "../hooks/useAdjustInputValues";
import Alert from "@mui/material/Alert";
interface Props {
  createdProgram: WorkoutModel;
}
const TrainingSessionForm: React.FC<Props> = ({ createdProgram }) => {
  const dispatch = useDispatch();
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  const selectedExercises = useSelector(
    (state: RootState) => state.program.selectedExercises
  );
  const validationSchema = useDynamicSchema(selectedExercises.length * 3);
  const initialValues = useDynamicInitialValues(selectedExercises.length * 3);
  const visibleExerciseSelection = useSelector(
    (state: RootState) => state.program.visibleExerciseSelection
  );
  const visibleAlert = useSelector(
    (state: RootState) => state.program.visibleAlertMessage
  );
  const handleClick = () => {
    // if (Object.keys(formik.errors).length > 0) return;
    dispatch(setVisibleExerciseSelection(true));
  };
  const handleSubmit = (values: any) => {
    console.log("valid");
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  useAdjustInputValues(initialValues, formik);
  return (
    <FormContainer text="Sessions" handleSubmit={formik.handleSubmit}>
      <SelectionCalendar />
      {selectedDays.length > 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
        </Box>
      ) : (
        <Typography></Typography>
      )}
    </FormContainer>
  );
};
export default TrainingSessionForm;
