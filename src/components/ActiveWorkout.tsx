import { useState, ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFinishedExercises, setVisibleOverlay } from "../store";
import Box from "@mui/material/Box";
import { TrainingSessionModel } from "../types/trainingSession.model";
import { ExerciseModel } from "../types/exercise.model";
import ExerciseSet from "./ExerciseSet";
import RestTimer from "./RestTimer";
interface Props {
  trainingSession: TrainingSessionModel;
}
const ActiveWorkout: React.FC<Props> = ({ trainingSession }) => {
  const dispatch = useDispatch();
  const exerciseIndex = useSelector(
    (state: RootState) => state.activeWorkout.currentExerciseIndex
  );
  const visibleOverlay = useSelector(
    (state: RootState) => state.activeWorkout.visibleOverlay
  );
  const [currentExercise, setCurrentExercise] = useState<ExerciseModel>(
    trainingSession.exercises[exerciseIndex]
  );
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [finishedSets, setFinishedSets] = useState<string[]>([]);
  useEffect(
    () => setCurrentExercise(trainingSession.exercises[exerciseIndex]),
    [exerciseIndex]
  );
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
    if (finished === currentExercise.sets.length) {
      setFinishedSets([]);
      dispatch(setFinishedExercises(currentExercise.id));
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
        display: visibleOverlay ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1201,
      }}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(setVisibleOverlay(false))
      }
    >
      <Box sx={{ p: 5 }}>
        <img
          src={currentExercise.gifUrl}
          style={{ width: "14rem" }}
          alt="Exercise demonstration"
        />
        {timerOn && (
          <RestTimer restBetweenSets={currentExercise.restBetweenSets} />
        )}
        {currentExercise.sets.map((item, i) => (
          <ExerciseSet
            key={i}
            weight={item.weight}
            reps={item.reps}
            index={i}
            handleChange={handleChange}
          />
        ))}
      </Box>
    </Box>
  );
};
export default ActiveWorkout;
