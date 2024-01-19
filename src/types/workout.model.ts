import { WorkoutType } from "../enums/WorkoutType";
import { Exercise } from "./exercise.model";
export interface WorkoutModel {
  title: string;
  description: string;
  creator: string;
  img_url: string;
  rating: number;
  participants: number;
  rates: number;
  type: WorkoutType;
  times_per_week: number;
  training_sessions: {
    name: string;
    exercises: Exercise[];
  }[];
  id: string;
}
