import { WorkoutModel } from "../types/workout.model";
const useIsWorkoutCreator = (workout: WorkoutModel, userId: string) => {
  return workout.creatorId === userId;
};
export default useIsWorkoutCreator;
