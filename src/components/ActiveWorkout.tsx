import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TrainingSessionModel } from "../types/trainingSession.model";
import Checkbox from "@mui/material/Checkbox";
interface Props {
  trainingSession: TrainingSessionModel;
  finishedExercises: string[];
  setFinishedExercises: (exerciseId: string[]) => void;
}
const ActiveWorkout: React.FC<Props> = ({
  trainingSession,
  setFinishedExercises,
  finishedExercises,
}) => {
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [finishedSets, setFinishedSets] = useState<string[]>([]);
  const handleChange = (event: ChangeEvent) => {
    const currentId = event.target.id;
    let added = false;
    if (!finishedSets.includes(currentId)) {
      setFinishedSets([...finishedSets, currentId]);
      setTimerOn(true);
      added = true;
    } else {
      const sets = finishedSets.filter((id) => currentId !== id);
      setFinishedSets(sets);
      setTimerOn(false);
    }
    const finished = added ? finishedSets.length + 1 : finishedSets.length;
    if (finished === trainingSession.exercises[0].sets.length) {
      const exercises = [...finishedExercises, currentId];
      setFinishedExercises(exercises);
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1201,
      }}
    >
      <Box sx={{ p: 5 }}>
        <img
          src={trainingSession.exercises[0].gifUrl}
          style={{ width: "14rem" }}
          alt="Exercise demonstration"
        />
        {timerOn && (
          <Typography>
            {trainingSession.exercises[0].restBetweenSets}
          </Typography>
        )}
        {trainingSession.exercises[0].sets.map((item, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                {item.weight}kg x {item.reps}
              </Typography>
              <Checkbox
                id={trainingSession.exercises[0].id}
                onChange={(event) => handleChange(event)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default ActiveWorkout;
