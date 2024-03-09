import { Timestamp } from "firebase/firestore";
import { WorkoutModel } from "./workout.model";
export interface JoinedWorkout {
  workout: WorkoutModel;
  finishedSessions: number;
  previousWeekProgress: number;
  lastSessionFinishDate?: Timestamp;
  isRated: boolean;
}
