import { useState } from "react";
import { ExerciseModel } from "../types/exercise.model";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
import ExerciseDetailsSelection from "./ExerciseDetailsSelection";
const TrainingSessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseModel[]>(
    []
  );
  const [providedDetails, setProvidedDetails] = useState<boolean>(true);
  const [visibleExerciseSelection, setVisibleExerciseSelection] =
    useState<boolean>(false);
  const handleClick = (values?: Object) => {
    console.log(values);
    if (!providedDetails) return;
    setVisibleExerciseSelection(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {};
  return (
    <FormContainer text="Sessions" handleSubmit={handleSubmit}>
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
                handleOpenSelection={handleClick}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 2,
              }}
              onClick={() => handleClick()}
            >
              <CiSquarePlus fontSize="2rem" />
              <Typography sx={{ ml: 1 }}>Add Exercise</Typography>
            </Box>
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
