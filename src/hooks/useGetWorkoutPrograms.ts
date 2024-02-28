import { WorkoutModel } from "../types/workout.model";
const useGetWorkoutPrograms = (
  userId: string,
  workouts: WorkoutModel[] | undefined
) => {
  if (!workouts) return;
  return workouts.filter((workout) => workout.creatorId === userId);
};
export default useGetWorkoutPrograms;
