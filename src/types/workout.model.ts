import { WorkoutType } from "../enums/WorkoutType";
import { TrainingSessionModel } from "./trainingSession.model";
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
  trainingSessions: TrainingSessionModel[];
  membersChat: Message[];
  id: string;
}
