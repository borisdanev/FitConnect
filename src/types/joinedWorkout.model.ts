import { WorkoutModel } from "./workout.model";
export interface JoinedWorkout {
  workout: WorkoutModel;
  finishedSessions: number;
}
