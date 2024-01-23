import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFinishedExercises } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TrainingSessionModel } from "../types/trainingSession.model";
import Checkbox from "@mui/material/Checkbox";
import { ExerciseModel } from "../types/exercise.model";
interface Props {
  trainingSession: TrainingSessionModel;
}
const ActiveWorkout: React.FC<Props> = ({ trainingSession }) => {
  const dispatch = useDispatch();
  const exerciseIndex = useSelector(
    (state: RootState) => state.activeWorkout.currentExerciseIndex
  );
  const [currentExercise, setCurrentExercise] = useState<ExerciseModel>(
    trainingSession.exercises[exerciseIndex]
  );
  console.log(exerciseIndex);
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
    if (finished === currentExercise.sets.length)
      dispatch(setFinishedExercises(currentExercise.id));
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
          src={currentExercise.gifUrl}
          style={{ width: "14rem" }}
          alt="Exercise demonstration"
        />
        {timerOn && <Typography>{currentExercise.restBetweenSets}</Typography>}
        {currentExercise.sets.map((item, i) => {
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
              <Checkbox id={`${i}`} onChange={(event) => handleChange(event)} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default ActiveWorkout;
