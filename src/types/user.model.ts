import { WorkoutModel } from "./workout.model";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
  workouts: WorkoutModel[];
}
