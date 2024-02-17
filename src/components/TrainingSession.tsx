import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExerciseModel } from "../types/exercise.model";
import {
  useSetFinishedSessionMutation,
  finishTrainingSession,
  useAddNotificationMutation,
} from "../store";
import Box from "@mui/material/Box";
import Exercise from "./Exercise";
import { RootState } from "../store";
interface Props {
  exercises: ExerciseModel[];
  name: string;
}
const TrainingSession: React.FC<Props> = ({ exercises, name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.value
  );
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value
  );
  const [setFinishedSession] = useSetFinishedSessionMutation();
  const [addNotification] = useAddNotificationMutation();
  const finishedExercises = useSelector(
    (state: RootState) => state.activeWorkout.finishedExercises
  );
  useEffect(() => {
    if (exercises.length === finishedExercises.length) {
      setFinishedSession({
        userId: currentUser.id,
        workoutId: currentWorkout.id,
      });
      addNotification({
        notification: {
          message: `${currentUser.firstName} ${currentUser.lastName} finished ${name} session`,
          dateAdded: new Date(),
        },
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
