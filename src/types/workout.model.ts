import { WorkoutType } from "../enums/WorkoutType";
export interface WorkoutModel {
  title: string;
  description: string;
  img_url: string;
  rating: number;
  participants: number;
  rates: number;
  type: WorkoutType;
  exercices: {};
}
