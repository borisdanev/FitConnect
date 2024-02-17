import { WorkoutType } from "../enums/WorkoutType";
import { TrainingSessionModel } from "./trainingSession.model";
import { Message } from "./message.model";
import { Notification } from "./notification.model";
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
  notifications: Notification[];
  id: string;
}
