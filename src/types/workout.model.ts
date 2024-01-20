import { WorkoutType } from "../enums/WorkoutType";
import { Exercise } from "./exercise.model";
import { Message } from "./message.model";
export interface WorkoutModel {
  title: string;
  description: string;
  creator: string;
  imgUrl: string;
  rating: number;
  participants: number;
  rates: number;
  type: WorkoutType;
  timesPerWeek: number;
  trainingSessions: {
    name: string;
    exercises: Exercise[];
  }[];
  membersChat: Message[];
  id: string;
}
