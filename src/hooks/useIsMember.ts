import { WorkoutModel } from "../types/workout.model";
const useIsMember = (workoutId: string, userWorkouts: WorkoutModel[]) => {
  if (userWorkouts.length === 0) return false;
  return userWorkouts.map((workout) => workout.id).includes(workoutId);
};
export default useIsMember;
