import { useState } from "react";
import { useGetExercisesQuery } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
import { CiSquarePlus } from "react-icons/ci";
import { ExerciseModel } from "../types/exercise.model";
const SessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseModel[]>(
    []
  );
  const [visibleExerciseSelection, setVisibleExerciseSelection] =
    useState<boolean>(false);
  const { data: exercises } = useGetExercisesQuery();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {};
  return (
    <FormContainer text="Sessions" handleSubmit={handleSubmit}>
      <SelectionCalendar
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      {selectedDays.length > 0 ? (
        <Box>
          <TextField label="Session Name" />
          {selectedExercises.map((item, i) => (
            <Typography>{i}</Typography>
          ))}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => setVisibleExerciseSelection(true)}
          >
            <CiSquarePlus fontSize="2rem" />
            <Typography sx={{ ml: 1 }}>Add Exercise</Typography>
          </Box>
          {visibleExerciseSelection ? <Box>Something</Box> : <Box></Box>}
        </Box>
      ) : (
        <Typography></Typography>
      )}
    </FormContainer>
  );
};
export default SessionForm;
