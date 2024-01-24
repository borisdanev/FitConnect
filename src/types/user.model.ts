import { JoinedWorkout } from "./joinedWorkout.model";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  workouts: JoinedWorkout[];
  id: string;
}
