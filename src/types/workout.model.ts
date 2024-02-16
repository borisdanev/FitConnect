import { WorkoutType } from "../enums/WorkoutType";
import { TrainingSessionModel } from "./trainingSession.model";
import { Message } from "./message.model";
export interface WorkoutModel {
  title: string;
  description: string;
  creator: string;
  rating: number;
  members: number;
  rates: number;
  type: WorkoutType;
  timesPerWeek: number;
  trainingSessions: TrainingSessionModel[];
  membersChat: Message[];
  notifications: string[];
  id: string;
}
