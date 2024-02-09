import { JoinedWorkout } from "./joinedWorkout.model";
import { WorkoutModel } from "./workout.model";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  workouts: JoinedWorkout[];
  programs: WorkoutModel[];
  id: string;
}
