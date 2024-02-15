import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExerciseModel } from "../types/exercise.model";
import { useSetFinishedSessionMutation, finishTrainingSession } from "../store";
import Box from "@mui/material/Box";
import Exercise from "./Exercise";
import { RootState } from "../store";
interface Props {
  exercises: ExerciseModel[];
}
const TrainingSession: React.FC<Props> = ({ exercises }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const [setFinishedSession] = useSetFinishedSessionMutation();
  const finishedExercises = useSelector(
    (state: RootState) => state.activeWorkout.finishedExercises
  );
  useEffect(() => {
    if (exercises.length === finishedExercises.length) {
      setFinishedSession({
        userId: currentUser.id,
        workoutId: currentWorkout.id,
      });
      dispatch(finishTrainingSession());
    }
  }, [finishedExercises]);
  return (
    <Box>
      {exercises.map((item, i) => (
        <Exercise
          key={item.id}
          name={item.name}
          gifUrl={item.gifUrl}
          id={item.id}
          index={i}
          totalExercises={exercises.length}
        />
      ))}
    </Box>
  );
};
export default TrainingSession;
