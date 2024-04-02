import { JoinedWorkout } from "./joinedWorkout.model";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hasProfilePicture: boolean;
  workouts: JoinedWorkout[];
  id: string;
}
