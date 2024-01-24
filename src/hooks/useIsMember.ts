import { JoinedWorkout } from "../types/joinedWorkout.model";
const useIsMember = (workoutId: string, userWorkouts: JoinedWorkout[]) => {
  if (userWorkouts.length === 0) return false;
  return userWorkouts.map((item) => item.workout.id).includes(workoutId);
};
export default useIsMember;
