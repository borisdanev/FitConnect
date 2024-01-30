import { useState } from "react";
import { ExerciseModel } from "../types/exercise.model";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
import ExerciseDetailsSelection from "./ExerciseDetailsSelection";
interface FormValues {
  sets: string;
  reps: string;
  restTimer: string;
}
const TrainingSessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseModel[]>(
    []
  );
  const [providedDetails, setProvidedDetails] = useState<boolean>(true);

  const [visibleExerciseSelection, setVisibleExerciseSelection] =
    useState<boolean>(false);
  const initialValues = {
    sets: "",
    reps: "",
    restTimer: "",
  };
  const validationSchema = Yup.object().shape({
    sets: Yup.string().required("Required"),
    reps: Yup.string().required("Required"),
    restTimer: Yup.string().required("Required"),
  });

  const handleClick = () => {
    // if (!providedDetails) return;
    if (Object.keys(formik.errors).length > 0) return;
    setVisibleExerciseSelection(true);
  };
  const handleSubmit = (values: FormValues) => {
    console.log("values");
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  console.log(formik.errors);
  return (
    <FormContainer text="Sessions" handleSubmit={formik.handleSubmit}>
      <SelectionCalendar
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
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
              // type={providedDetails ? "button" : "submit"}
            >
              <CiSquarePlus fontSize="2rem" />
              <Typography sx={{ ml: 1 }}>Add Exercise</Typography>
            </Button>
            {visibleExerciseSelection && (
              <ExerciseSelection
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                setVisibleExerciseSelection={setVisibleExerciseSelection}
                setProvidedDetails={setProvidedDetails}
              />
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
