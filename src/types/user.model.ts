import { WorkoutModel } from "./workout.model";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  workouts: WorkoutModel[];
  id: string;
}
