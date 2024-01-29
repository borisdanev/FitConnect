import { useState } from "react";
import { ExerciseModel } from "../types/exercise.model";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import { CiSquarePlus } from "react-icons/ci";
import ExerciseSelection from "./ExerciseSelection";
const TrainingSessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseModel[]>(
    []
  );
  const [visibleExerciseSelection, setVisibleExerciseSelection] =
    useState<boolean>(false);
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
              <Box sx={{ display: "flex", height: "3rem", mt: 2 }}>
                <img
                  src={item.gifUrl}
                  style={{ maxWidth: "100%", height: "auto" }}
                  alt="Exercise Demonstration"
                />
                <Box>
                  <Typography sx={{ ml: 1, mt: 1.4 }}>{item.name}</Typography>
                  <Box sx={{ display: "flex" }}>
                    {["sets", "reps", "restTime"].map((item) => (
                      <TextField
                        sx={{ mr: 1 }}
                        label={item}
                        variant="standard"
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
            <Box
              sx={{ display: "flex", alignItems: "center", my: 2 }}
              onClick={() => setVisibleExerciseSelection(true)}
            >
              <CiSquarePlus fontSize="2rem" />
              <Typography sx={{ ml: 1 }}>Add Exercise</Typography>
            </Box>
            {visibleExerciseSelection && (
              <ExerciseSelection
                selectedExercises={selectedExercises}
                setSelectedExercises={setSelectedExercises}
                setVisibleExerciseSelection={setVisibleExerciseSelection}
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
