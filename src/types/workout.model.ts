import { WorkoutType } from "../enums/WorkoutType";
import { TrainingSessionModel } from "./trainingSession.model";
import { Message } from "./message.model";
import { NotificationModel } from "./notification.model";
export interface WorkoutModel {
  title: string;
  description: string;
  creator: string;
  creatorId: string;
  rating: number;
  members: number;
  rates: number;
  type: WorkoutType;
  timesPerWeek: number;
  trainingSessions: TrainingSessionModel[];
  membersChat: Message[];
  notifications: NotificationModel[];
  id: string;
}
