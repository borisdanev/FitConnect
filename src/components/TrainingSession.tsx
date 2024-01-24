import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentExerciseIndex } from "../store";
import { RootState } from "../store";
import { ExerciseModel } from "../types/exercise.model";
import { useSetFinishedSessionMutation } from "../store";
import Box from "@mui/material/Box";
import Exercise from "./Exercise";
interface Props {
  exercises: ExerciseModel[];
}
const TrainingSession: React.FC<Props> = ({ exercises }) => {
  const dispatch = useDispatch();
  // const finishedExercises = useSelector(
  //   (state: RootState) => state.activeWorkout.finishedExercises
  // );
  // useEffect(() => {
  //   if (finishedExercises.includes(id) && finishedExercises) {
  //     dispatch(setCurrentExerciseIndex(index + 1));
  //   }
  // }, [finishedExercises]);
  const workout = useSelector((state: RootState) => state.currentWorkout.value);
  const [setFinishedSession] = useSetFinishedSessionMutation();
  const finishedExercises = useSelector(
    (state: RootState) => state.activeWorkout.finishedExercises
  );
  useEffect(() => {
    if (exercises.length === finishedExercises.length) {
      setFinishedSession({ id: workout.id, value: 1 });
      // dispatch(setIsFinishedTrainingSession(true));
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
        />
      ))}
    </Box>
  );
};
export default TrainingSession;
