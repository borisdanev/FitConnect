import { useState, ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFinishedExercises, setVisibleOverlay } from "../store";
import Box from "@mui/material/Box";
import { TrainingSessionModel } from "../types/trainingSession.model";
import { ExerciseModel } from "../types/exercise.model";
import ExerciseSet from "./ExerciseSet";
import RestTimer from "./RestTimer";
import { FaClock } from "react-icons/fa6";
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
  useEffect(() => {
    if (finishedSets.length !== currentExercise.sets) return;
    setFinishedSets([]);
    dispatch(setFinishedExercises(currentExercise.id));
  }, [finishedSets]);
  const handleChange = (event: ChangeEvent) => {
    const currentId = event.target.id;
    if (!finishedSets.includes(currentId)) {
      setFinishedSets([...finishedSets, currentId]);
      setTimerOn(true);
      return;
    }
    const updatedFinishedSets = finishedSets.filter((id) => currentId !== id);
    setFinishedSets(updatedFinishedSets);
    setTimerOn(false);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        display: visibleOverlay ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1201,
      }}
      className="position-fill"
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(setVisibleOverlay(false))
      }
    >
      <Box sx={{ p: 5, bgcolor: "#29332e", borderRadius: "0.5rem" }}>
        <img
          src={currentExercise.gifUrl}
          style={{ width: "14rem" }}
          draggable={false}
          alt="Exercise demonstration"
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {timerOn ? (
            <RestTimer
              restBetweenSets={currentExercise.restBetweenSets}
              setTimerOn={setTimerOn}
            />
          ) : (
            <Box
              sx={{
                width: "3.1rem",
                height: "3.1rem",
                borderRadius: "50%",
                border: "1px solid #37423d",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaClock />
            </Box>
          )}
        </Box>
        {Array(currentExercise.sets)
          .fill(null)
          .map((_, i) => (
            <ExerciseSet
              key={i}
              reps={currentExercise.reps}
              checkboxId={`${currentExercise.id}${i}`}
              handleChange={handleChange}
              finishedSets={finishedSets}
            />
          ))}
      </Box>
    </Box>
  );
};
export default ActiveWorkout;
